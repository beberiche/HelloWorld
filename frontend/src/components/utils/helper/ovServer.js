// SERVER_SIDE
import axios from 'axios'

const OPENVIDU_SERVER_URL = 'https://' + window.location.hostname + ':4443'
const OPENVIDU_SERVER_SECRET = 'MY_SECRET'

export async function getToken(mySessionId) {
  const sessionId = await createSession(mySessionId)
  const token = await createToken(sessionId)
  return token
}

function createSession(sessionId) {
  return new Promise(async (resolve, reject) => {
    let data = JSON.stringify({ customSessionId: sessionId })
    try {
      const response = await axios.post(
        OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
        data,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        },
      )

      // 에러 처리 (초기 요청이 제대로 안 이루어지는 경우가 있다)
      setTimeout(() => {
        console.log('개발자 설정을 통한 강제 리턴')
        return resolve(sessionId)
      }, 1000)
      return response
    } catch (response) {
      console.log(response)
      let error = Object.assign({}, response)
      if (error?.response?.status === 409) {
        return resolve(sessionId)
      }
    }
  })
}

function createToken(sessionId) {
  return new Promise(async (resolve, reject) => {
    var data = {}
    try {
      const response = await axios.post(
        OPENVIDU_SERVER_URL +
          '/openvidu/api/sessions/' +
          sessionId +
          '/connection',
        data,
        {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        },
      )
      return resolve(response.data.token)
    } catch (error) {
      return reject(error)
    }
  })
}
