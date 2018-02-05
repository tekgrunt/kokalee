
declare const hoodie: any;

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

interface AuthResponse {token: string}

// TODO: make rocketchat origin configurable
const ROCKET_CHAT = 'http://localhost:3000'

let $iframe: HTMLIFrameElement | null = null;
if (window.top === window) {
  $iframe = document.querySelector('iframe')!
  // $iframe.setAttribute('src', ROCKET_CHAT);
  const $chatContainer = document.querySelector<HTMLDivElement>('.chat-container')!
  $chatContainer.style.display = ''
}

loggedIn(true)
function loggedIn(fetchToken: boolean) {
  console.log('[rocket.chat] checking login')
  ;(fetchToken ? (hoodie.rocketchat.auth() as Promise<AuthResponse>) : zalgoPromiseReject(new Error('Not fetching')))
  .then((resp) => {
    $signOut.removeAttribute('disabled')
    formInputs.forEach(el => el.setAttribute('disabled', 'disabled'))

    const message = {
      event: 'login-with-token',
      token: resp.token
      // event: 'try-iframe-login'
    }
    console.log('[rocket.chat] posting message to ' + ROCKET_CHAT, message)
    if ($iframe) {
      $iframe.contentWindow.postMessage(message, ROCKET_CHAT)
    } else {
      window.parent.postMessage(message, ROCKET_CHAT);
    }
  }, (err) => {
    $signOut.setAttribute('disabled', 'disabled')
    formInputs.forEach(el => el.removeAttribute('disabled'))
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