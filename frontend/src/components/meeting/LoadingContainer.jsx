import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import LoadingSpinner from '../common/LoadingSpinner'
import Button from '../common/Button'
import classes from './LoadingContainer.module.css'
import { findRoom } from '../../store/room-thunkActions'

import { useDispatch, useSelector } from 'react-redux/es/exports'

import { ovActions } from '../../store/ov-slice'
import { getToken } from '../utils/helper/ovServer'
import { getRandomTip } from '../../store/tip-thunkActions'
import { leaveRoom } from '../../store/room-thunkActions'
import { peerUserActions } from '../../store/peerUser-slice'

//
// 출처: https://velog.io/@jakeseo_me/%EB%B2%88%EC%97%AD-%EB%A6%AC%EC%95%A1%ED%8A%B8-%ED%9B%85%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%97%90%EC%84%9C-setInterval-%EC%82%AC%EC%9A%A9-%EC%8B%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90#interval-%EC%9D%BC%EC%8B%9C%EC%A0%95%EC%A7%80%ED%95%98%EA%B8%B0
// function useInterval(callback, delay) {
//   const savedCallback = useRef()

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback
//   }, [callback])

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current()
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay)
//       return () => clearInterval(id)
//     }
//   }, [delay])
// }

// const OPENVIDU = new OpenVidu()

function LoadingContainer({ handleModal }) {
  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth)
  const room = useSelector(state => state.room)
  const openvidu = useSelector(state => state.openvidu)
  const location = useLocation()

  const { token } = auth
  const { mySessionId, OV, session, myUserName, subscriber } = openvidu
  const { roomId } = room
  const { nickname, heart, country } = user

  const [loading, setLoading] = useState(true)
  const [seconds, setSeconds] = useState(500000)
  const [tip, setTip] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const moveToMeetingPage = () => navigate(`/meeting/${mySessionId}`)

  useEffect(() => {
    dispatch(findRoom(token))

    const getTip = async () => {
      const { payload } = await dispatch(getRandomTip(token))
      setTip(payload.data.content)
    }
    getTip()
  }, [])

  useEffect(() => {
    const initRoom = async () => {
      if (roomId) {
        const dataObj = {
          roomId,
          nickname,
        }
        dispatch(ovActions.createOpenvidu(dataObj))
      }
    }
    initRoom()
  }, [roomId])

  useEffect(() => {
    const initToken = async () => {
      getToken(mySessionId)
        .then(token => {
          navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          })
          session.connect(token, { clientData: myUserName }).then(async () => {
            let devices = await OV.getDevices()
            let videoDevices = devices.filter(
              device => device.kind === 'videoinput',
            )

            let publisher = OV.initPublisher(undefined, {
              audioSource: undefined, // The source of audio. If undefined default microphone
              videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
              publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
              publishVideo: false, // Whether you want to start publishing with your video enabled or not
              resolution: '640x480', // The resolution of your video
              frameRate: 30, // The frame rate of your video
              insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
              mirror: false, // Whether to mirror your local video
            })

            const dataObj = {
              currentVideoDevice: videoDevices[0],
              publisher,
            }

            dispatch(ovActions.createPublisher(dataObj))
          })
        })
        .catch(error => {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          )
        })
    }
    initToken()
  }, [mySessionId])

  useEffect(() => {
    if (session) {
      session.on('streamCreated', event => {
        console.log(event.stream)
        dispatch(ovActions.enteredSubscriber(event.stream))
        setTimeout(() => {
          setSeconds(5)
          setLoading(false)
        }, 2000)
      })

      session.on('streamDestroyed', event => {
        dispatch(ovActions.deleteSubscriber(event.stream.streamManager))
      })

      session.on('signal:peerUser', event => {
        const userData = JSON.parse(event.data)
        if (room.isCreatedRoom !== userData.createdRoom) {
          console.log('----------------')
          console.log(userData)
          console.log('-----------------')
          dispatch(peerUserActions.getPeerUserData(userData))
        }
      })

      session.on('publisherStartSpeaking', () => {
        console.log('나지금 말하고 있다!!')
      })

      session.on('publisherStopSpeaking', () => {
        console.log('나지금 말 멈췄다!')
      })

      session.on('exception', exception => {
        console.warn(exception)
      })
    }
  }, [session])

  // 시계 카운트
  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 1) {
        setSeconds(parseInt(seconds) - 1)
      } else {
        if (location.search === '?rematching=true') {
          navigate(`/meeting/${mySessionId}`, { replace: true })
        } else {
          navigate(`/meeting/${mySessionId}`)
        }
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [seconds])

  // connectSocket()

  return (
    <div className={classes.loadingContainer}>
      {loading ? (
        <>
          <h1>전세계의 대화 상대를 찾고 있는 중이에요.</h1>
          <LoadingSpinner></LoadingSpinner>
        </>
      ) : (
        <>
          <h1>당신과 이야기 하기를 원하는 대화 상대를 찾았어요!</h1>
          <h3>
            <strong className={classes.timer}>{seconds}초</strong> 뒤에
            미팅페이지로 이동합니다.{' '}
          </h3>
          {/* <div className={classes.buttons}>
            <Button text="대화 시작하기" onEvent={moveToMeetingPage}></Button>
            <Button
              text="취소하기"
              color="error"
              onEvent={handleModal}
            ></Button>
          </div> */}
        </>
      )}
      <p className={classes.tip}>TIP. {tip}</p>
    </div>
  )
}

LoadingContainer.propTypes = {
  handleModal: PropTypes.func.isRequired,
}

export default LoadingContainer
