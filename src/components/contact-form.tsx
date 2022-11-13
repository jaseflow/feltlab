import { useEffect } from 'react';
import styles from '../styles/ContactForm.module.css';

import { useForm, ValidationError } from '@formspree/react';

import Image from 'next/image';

import Spinner from './spinner';

interface ContactFormProps {
  open?: boolean;
  onClose: () => void;
}

const ContactForm = ({ open, onClose } : ContactFormProps) => {
  const [state, handleSubmit] = useForm('xdojyqyd');

  useEffect(() => {
    if (state.succeeded) {
      onClose();
    }
  }, [state])

  return (
    <div className={`${styles.contact} ${open ? styles.contactOpen : null}`}>
      <div className={`${styles.contactBg} ${open ? styles.contactBgOpen : null}`} />
      <div className={`${styles.wrapper} ${open ? styles.wrapperOpen : null}`}>
        <header className={styles.header}>
          <h1 className="title title--tiny inverse">Get in touch</h1>
          <div className={styles.close} onClick={onClose}>
            <Image src="/xmark-light.svg" width="24" height="24" />
          </div>
        </header>
        <div>
          <p className={styles.intro}>If you’re interested in working with us or just want to have a chat, then leave 
             a message below and we will get back to you as soon as possible.</p>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input id="name" name="name" type="input" className="input" placeholder="Your name" />
          <ValidationError 
            prefix="Name" 
            field="name"
            errors={state.errors}
          />
          <input id="email" name="email" type="email" className="input" placeholder="Your email" />
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
          />
          <input id="phone" name="phone" type="phone" className="input" placeholder="Your phone (Optional)" />
          <textarea id="message" name="message" className="input input--textarea" placeholder="Your message"/>
          <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
          />
          <button className="btn btn--block">
            {state.submitting ? <Spinner /> : 'Send message'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
