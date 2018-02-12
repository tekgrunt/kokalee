
declare class RocketChat {
  constructor(hoodie: any)
  auth(sessionId?: string): Promise<{
    token: string;
  }>;
  config(): Promise<{
    rootUrl: string
  }>;
}

declare const hoodie: {
  rocketchat: RocketChat
  account: any
};

const $main = document.querySelector<HTMLDivElement>('#main')!
const $form = document.querySelector('form')!
const $error = document.querySelector<HTMLParagraphElement>('#error')!
const $signUp = document.querySelector<HTMLButtonElement>('#signup-button')!
const $signOut = document.querySelector<HTMLButtonElement>('#signout-button')!

const arrayFrom = <T extends Node>(a: NodeListOf<T>): T[] => Array.prototype.slice.apply(a)

const formInputs = arrayFrom($form.querySelectorAll('form button, form input'))

function zalgoPromiseResolve<T>(val: T) {
  return {
    then(resolve: (val: T) => void) {
      resolve(val)
    }
  }
}
function zalgoPromiseReject(err) {
  return {
    then(resolve: (val) => void, reject: (err) => any) {
      return zalgoPromiseResolve(reject(err))
    }
  }
}

// TODO: make rocketchat origin configurable
const config = hoodie.rocketchat.config()

let $iframe: HTMLIFrameElement | null = null
if (window.top === window) {
  $main.style.display = ''
  // $iframe = document.querySelector('iframe')!
  // config.then(({rootUrl}) => {
  //   $iframe!.setAttribute('src', rootUrl)
  // })
  // const $chatContainer = document.querySelector<HTMLDivElement>('.chat-container')!
  // $chatContainer.style.display = ''
}

loggedIn(true).then((loggedIn) => {
  if (!loggedIn) {
    $main.style.display = ''
  }
})
function loggedIn(fetchToken: boolean) {
  console.log('[rocket.chat] checking login')
  return (fetchToken ? (hoodie.rocketchat.auth()) : zalgoPromiseReject(new Error('Not fetching')))
  .then((resp: {token: string}) => {
    $signOut.removeAttribute('disabled')
    formInputs.forEach(el => el.setAttribute('disabled', 'disabled'))

    const message = {
      event: 'login-with-token',
      token: resp.token
      // event: 'try-iframe-login'
    }
    return config.then(({rootUrl}) => {
      console.log('[rocket.chat] posting message to ' + rootUrl, message)
      if ($iframe) {
        $iframe.contentWindow.postMessage(message, rootUrl)
      } else {
        window.parent.postMessage(message, rootUrl)
      }
      return true
    })
  }, (err) => {
    $signOut.setAttribute('disabled', 'disabled')
    formInputs.forEach(el => el.removeAttribute('disabled'))
    return false
  })
}


const getCredentials = () => ({
  username: document.querySelector<HTMLInputElement>('[name="username"]')!.value,
  password: document.querySelector<HTMLInputElement>('[name="password"]')!.value
})

function showError(err: Error | false) {
  if (!err) {
    $error.style.display = 'none'
    return
  }
  $error.style.display = 'block'
  $error.textContent = err.toString()

}

$form.addEventListener('submit', (event) => {
  event.preventDefault()

  hoodie.account.signIn(getCredentials())
  .then(() => {
    $form.reset()
    showError(false)
    loggedIn(true)
  })
  .catch(showError)
})

$signUp.addEventListener('click', (event) => {
  event.preventDefault()

  const creds = getCredentials();
  hoodie.account.signUp(creds)
  .then(() => {
    return hoodie.account.signIn(creds)
  }).then(() => {
    $form.reset()
    showError(false)
    loggedIn(true)
  })
  .catch(showError)
})

$signOut.addEventListener('click', (event) => {
  event.preventDefault()

  hoodie.account.signOut(getCredentials())
  .then(() => {
    showError(false)
    loggedIn(false)
  })
  .catch(showError)
})

window.addEventListener('message', (event) => {
  console.log(event);
})