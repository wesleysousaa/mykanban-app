import React, { useState } from 'react'
import styles from './Card.module.css'

// MUI
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import WorkHistoryIcon from '@mui/icons-material/WorkHistory'
import SyncIcon from '@mui/icons-material/Sync'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import TextField from '@mui/material/TextField'
import { useSnackbar } from 'notistack'

// Hooks
import { useChange } from '../hooks/useChange'
import { useCards } from '../hooks/useCards'

const Cardjs = ({ card }) => {

    const { change, setChange } = useChange()
    const { remove, update } = useCards()
    const { enqueueSnackbar } = useSnackbar()

    const [isEdit, setIsEdit] = useState(false)
    const [titulo, setTitulo] = useState(card.titulo)
    const [conteudo, setConteudo] = useState(card.conteudo)

    function checkListType() {
        return card.lista === "TODO" ? styles.listGroupTODO : card.lista === "DOING" ? styles.listGroupDOING : styles.listGroupDONE
    }

    function checkListIcon() {
        return card.lista === "TODO" ? <WorkHistoryIcon /> : card.lista === "DOING" ? <SyncIcon /> : <FactCheckIcon />
    }

    async function deleteCard() {
        await remove(card)
        setChange(!change)
    }

    function editPost() {
        setIsEdit(true)
    }

    function closeEditPost() {
        setIsEdit(false)
        setTitulo(card.titulo)
        setConteudo(card.conteudo)
    }

    async function updatePost() {
        const cardToUpade = {
            titulo,
            conteudo,
            lista: card.lista,
            _id: card._id
        }

        const response = await update(cardToUpade)

        if (!response) {
            return enqueueSnackbar("Não deixe nenhum campo vazio", { variant: 'error', autoHideDuration: 1000 })
        }
        setChange(!change)
        closeEditPost()
    }

    return (
        <Card className={styles.card}>
            {isEdit ? (
                <div className={styles.cardEdit}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Titulo"
                        type="text"
                        value={titulo}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Conteudo"
                        type="text"
                        value={conteudo}
                        fullWidth
                        variant="standard"
                        onChange={(e) => setConteudo(e.target.value)}
                    />
                </div>
            ) : (
                <CardContent>
                    <div className={styles.lista}>
                        <div className={checkListType()}>
                            {checkListIcon()}
                            <p>{card.lista}</p>
                        </div>
                    </div>
                    <div className={styles.labelGroup}>
                        <p>Titulo</p>
                        <h3>
                            {card.titulo}
                        </h3>
                    </div>
                    <div className={styles.labelGroup}>
                        <p>Conteudo</p>
                        <h4>
                            {card.conteudo}
                        </h4>
                    </div>
                </CardContent>
            )}
            <CardActions className={styles.buttonGroup}>
                {isEdit ? (
                    <>
                        <Button size="small" sx={{ color: 'red' }} onClick={closeEditPost}>Voltar</Button>
                        <Button size="small" color='success' onClick={updatePost}>Salvar</Button>
                    </>
                ) : (
                    <>
                        <Button size="small" sx={{ color: 'blue' }} onClick={editPost}>Editar</Button>
                        <Button size="small" color='error' onClick={deleteCard}>Apagar</Button>
                    </>
                )}
            </CardActions>
        </Card>
    )
}

export default Cardjs