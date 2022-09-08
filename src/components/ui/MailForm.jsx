import React, { useRef, useState } from 'react'

export const MailForm = ({
    mailTo,
    setMailTo,
    subject,
    setSubject,
    message,
    setMessage,

    tags,
    setTags,
    toast
}) => {

    const emailRef = useRef()
    const subjectRef = useRef()
    const ccRef = useRef()

    const handleSelect = (refName) => {
        const input = refName.current
        input.select()
    }

    // ------------------- TAGS

    const [cc, setCc] = useState("")

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = val => {

        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!regexp.test(val)) { return toast.error('Invalid Email') }

        if (val !== "") {
            setTags([...tags, val]);
            setCc("");
        }

    };

    // -------------------



    return (
        <div className="email-container">
            <div className="share-email mb-1">
                <p>Email to:</p>
                <input
                    ref={emailRef}
                    type='email'
                    placeholder='mail@example.com'
                    name={mailTo}
                    value={mailTo}
                    onChange={(e) => setMailTo(e.target.value)}
                    onClick={() => handleSelect(emailRef)}
                />
            </div>
            <div className="share-email mb-1">
                <p>Cc:</p>
                <div className="cc-container">
                    <div className="tags-input">
                        <ul id="tags">
                            {tags.map((tag, index) => (
                                <li key={index} className="tag">
                                    <span className='tag-title'>{tag}</span>
                                    <span className='tag-close-icon'
                                        onClick={() => removeTags(index)}
                                    >
                                        x
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <input
                            ref={ccRef}
                            value={cc}
                            onClick={() => handleSelect(ccRef)}
                            onChange={(e) => setCc(e.target.value)}
                            type="text"
                            onKeyUp={event => event.key === "Enter" ? addTags(cc) : null}
                            placeholder="Press enter to add email"
                        />
                    </div>
                    <button
                        onClick={() => addTags(cc)}
                        className="ml-05 cc-btn"
                    >+</button>

                </div>
            </div>
            <div className="share-email mb-1">
                <p>Subject:</p>
                <input
                    ref={subjectRef}
                    type='text'
                    placeholder='Add a subject'
                    name={subject}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    onClick={() => handleSelect(subjectRef)}
                />
            </div>
            <div className="share-email">
                <p>Message:</p>
                <textarea
                    type='text'
                    rows="8"
                    name={message}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>
        </div>
    )
}
