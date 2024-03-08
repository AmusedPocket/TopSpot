import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useNavigate } from "react-router";
import { useState } from "react";
import { thunkGetSpot } from "../../../redux/spot";
import SpotForm from "../../SpotForm/SpotForm";
import Button from "../Button/Button";
import './Delete.css'

const Delete = ({spot, thunk, item}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {setModalContent, closeModal} = useModal()
    const [yes, setYes] = useState("Yes")
    const [no, setNo] = useState("No")

    const deleteClick = async (e) => {
        e.preventDefault()

        if(item.body){
            await dispatch(thunk(item.id))
            await dispatch(thunkGetSpot(spot.id))
            closeModal();
        } else {
            navigate('/')
            await dispatch(thunk(item.id))
            closeModal();
        }
    }

    const cancel = (e) => {
        e.preventDefault()

        if(item.body) setModalContent(<ReviewForm spot={spot} review={item} />)
        else setModalContent(<SpotForm spot={spot} />)
    }

    return (
        <div className="confirm-delete-button">
            
                <p className="confirm-delete">Confirm delete?</p>
                <div
                    className="yes-delete"
                    onMouseEnter={() => {
                        setYes("Delete");
                    }}
                    onMouseLeave={() => {
                        setYes("Yes")
                    }}
                    >
                        <Button onClick={deleteClick} text={yes}/>
                    </div>
                    <div
                        className="no-delete"
                        onMouseEnter={() => {
                            setNo("Cancel delete")
                        }}
                        onMouseLeave={() => {
                            setNo("No")
                        }}
                        >
                            <Button onClick={cancel} text={no} />
                        </div>
            
        </div>
    )
}

export default Delete;