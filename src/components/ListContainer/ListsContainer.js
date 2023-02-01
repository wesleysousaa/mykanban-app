import React, { useEffect, useState } from 'react'
import styles from './ListContainer.module.css'

import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// Hooks
import { useCards } from '../../hooks/useCards'
import { useChange } from '../../hooks/useChange'

// MUI
import Divider from '@mui/material/Divider'
import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { useSnackbar } from 'notistack'

// Components
import Cardjs from '../../Card/Cardjs'


const ListsContainer = () => {

  const [todo, setTodo] = useState([])
  const [doing, setDoing] = useState([])
  const [done, setDone] = useState([])
  const [cards, setCards] = useState([])
  const [open, setOpen] = useState(false)
  const [titulo, setTitulo] = useState('')
  const [conteudo, setConteudo] = useState('')

  const { enqueueSnackbar } = useSnackbar()
  const { change, setChange } = useChange()
  const { fetch, update, create } = useCards()

  useEffect(() => {
    async function getCards() {

      const data = await fetch()
      setCardsLists(data)
    }
    getCards()
  }, [change])

  function setCardsLists(data) {
    setTodo(data.filter((c) => c.lista === "TODO"))
    setDoing(data.filter((c) => c.lista === "DOING"))
    setDone(data.filter((c) => c.lista === "DONE"))
    setCards(data)
  }

  async function handleDrag(event) {
    let destino = event.destination
    let src = event.source
    let card = cards.filter((c) => c._id === event.draggableId)[0]

    if (destino) {
      card.lista = destino.droppableId
      let arr = []

      arr = destino.droppableId === "TODO" ? todo : destino.droppableId === "DOING" ? doing : done
      if (destino.droppableId === src.droppableId) {
        arr.splice(src.index, 1)
      }
      arr.splice(destino.index, 0, card)

      if (destino.droppableId === "TODO") {
        setTodo(arr)
      } else if (destino.droppableId === "DOING") {
        setDoing(arr)
      } else {
        setDone(arr)
      }
    }
    if (destino && destino.droppableId !== src.droppableId) {
      setCardsLists(await update(card))
      setChange(!change)
    }
  }

  function showDialog() {
    setOpen(true)
  }

  function closeDialog() {
    setOpen(false)
  }



  async function handleCreateCard() {
    const card = {
      titulo,
      conteudo,
      lista: "TODO"
    }
    const response = await create(card)

    if (response.message) {
      return enqueueSnackbar('Preêncha todos os campos corretamente', { variant: 'error' })
    }

    setTitulo('')
    setConteudo('')
    setChange(!change)
    closeDialog()
  }

  return (
    <DragDropContext
      onDragEnd={(e) => handleDrag(e)}>
      <motion.div className={styles.container}
        initial={{ x: window.innerWidth }}
        animate={{ x: window.innerWidth - window.innerWidth }}
        exit={{ x: -window.innerWidth }}>
        <Dialog open={open} onClose={closeDialog} className={styles.dialog}>
          <DialogTitle>
            Novo Card
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Digite o titulo e conteúdo do card.
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDialog}>Cancelar</Button>
            <Button onClick={handleCreateCard}>Criar</Button>
          </DialogActions>
        </Dialog>
        <div className={styles.todo}>
          <h1>To do</h1>
          <Droppable droppableId="TODO">
            {(provided) => (
              <>
                <ul className="TODO" {...provided.droppableProps} ref={provided.innerRef}>
                  {todo && todo.map((c, k) => (
                    c.lista === "TODO" && (
                      <Draggable key={c._id} draggableId={c._id} data-react-beautiful-dnd-scroll-container={k} index={k}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <Cardjs card={c} />
                          </li>
                        )}
                      </Draggable>
                    )
                  ))}
                  {provided.placeholder}
                </ul>
                <Fab variant="extended" size="medium" color="success" aria-label="add" onClick={showDialog}>
                  <AddIcon sx={{ mr: 1 }} />
                  Novo
                </Fab>
              </>
            )}
          </Droppable>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.doing}>
          <h1>Doing</h1>
          <Droppable droppableId="DOING">
            {(provided) => (
              <ul className="DOING" {...provided.droppableProps} ref={provided.innerRef}>
                {doing && doing.map((c, k) => (
                  c.lista === "DOING" && (
                    <Draggable key={c._id} draggableId={c._id} index={k}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Cardjs card={c} />
                        </li>
                      )}
                    </Draggable>
                  )
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.done}>
          <h1>Done</h1>
          <Droppable droppableId="DONE">
            {(provided) => (
              <ul className="DONE" {...provided.droppableProps} ref={provided.innerRef}>
                {done && done.map((c, k) => (
                  c.lista === "DONE" && (
                    <Draggable key={c._id} draggableId={c._id} index={k}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <Cardjs card={c} />
                        </li>
                      )}
                    </Draggable>
                  )
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>
      </motion.div>
    </DragDropContext >
  )
}

export default ListsContainer