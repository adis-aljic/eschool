

{isAddClicked && (
    <Modal
      className={styles.cardAddGrades}
      title={` Student ${studentName.firstName} ${studentName.lastName}`}
      message={`Email : ${studentName.email} `}
      onConfirm={closeAddButton}
    >
      <form className="addNewGrade" onSubmit={addGradeHandler}>
        <input
          type="number"
          value={enteredGrade}
          onChange={enteredGradeHandler}
          ref={enteredGradeRef}
          min={1}
          max={5}
          placeholder="Enter grade"
        ></input>
        <button type="submit">Add grade</button>
      </form>
      <form onSubmit={deleteGradeHandler} className={styles.deleteGrade}>
        {message && <p>{message}</p>}
        <input
          type="number"
          placeholder="Grade"
          onChange={enteredDeleteGradeHandler}
          ref={enteredDeleteGradeRef}
          value={enteredDeleteGrade}
        ></input>
        <button type="submit">Delete grade</button>
      </form>
      <form onSubmit={addNoteHandler}>
        <textarea
          placeholder="Enter note"
          maxLength={50}
          value={enteredNote}
          onChange={enteredNoteHandler}
          ref={enteredNoteRef}
        ></textarea>
        <p>{enteredNote.length}/50</p>

        <button type="submit">Add note</button>
      </form>
      <form onSubmit={deleteNoteHandler} className={styles.deleteNote}>
        <input
          type="number"
          placeholder="Enter note number"
          value={enteredNoteNbr}
          onChange={enteredNoteNbrHandler}
          ref={enteredNoteNbrRef}
        ></input>
        <button className={styles.deleteLastGradeBtn} type="submit">
          Delete last note
        </button>
      </form>
    </Modal>
  )}