import React, { useEffect, useRef, useState } from 'react'

const Modal = ({ setModal, modal, setGroups, groups }) => {
    const nameref = useRef();
    const [color, setColor] = useState("#f00");

    useEffect(() => {
        if (modal) {
            const picker = document.querySelectorAll(".color_picker div");
            picker.forEach((item) => {
                item.addEventListener("click", () => {
                    switch (item.className) {
                        case "violet":
                            console.log(color);
                            setColor("#b38bfa");
                            break;
                        case "pink":
                            setColor("#ff79f2");
                            break;
                        case "cyan":
                            setColor("#43e6fc");
                            break;
                        case "brown":
                            setColor("#f19576");
                            break;
                        case "blue":
                            setColor("#0047ff");
                            break;
                        case "navy":
                            setColor("#6691ff");
                            break;
                        default:
                            setColor("#00f");
                            break;
                    }
                });
            });
        }
    });

    const createGroup = () => {
        const name = nameref.current.value;
        setGroups([
            ...groups,
            {
                name: name,
                color: color,
                notes: [],
            },
        ]);
        setModal(false);
    };


    return (

        <div className="modal_container">
            <div
                className="modal_close_area"
                onClick={() => setModal(false)}
            ></div>
            <div className="modal">
                <h1 className="modal_header">Create New Notes group</h1>
                <div className="row">
                    <h1>Group Name</h1>
                    <input
                        ref={nameref}
                        type="text"
                        name="group-name"
                        className="group_name"
                        placeholder="Enter your group name...."
                        required
                    />
                </div>
                <div className="row">
                    <h1>Choose color</h1>
                    <div className="color_picker">
                        <div className="violet"></div>
                        <div className="pink"></div>
                        <div className="cyan"></div>
                        <div className="brown"></div>
                        <div className="blue"></div>
                        <div className="navy"></div>
                    </div>
                </div>
                <div className="createbtn" onClick={() => createGroup()}>
                    Create
                </div>
            </div>
        </div>
    )
}

export default Modal
