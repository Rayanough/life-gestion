import React from 'react';

function ToDoList({ styles, STATUS, setShowModal }) {
  return (
    <div>
      <input style={styles.searchInput} placeholder="Rechercher une tâche..." />
      <button style={styles.filterBtn}>Filtrer</button>
      <button style={styles.addBtn} onClick={() => setShowModal(true)}>Ajouter</button>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tâche</th>
              <th style={styles.th}>Projet</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={styles.td}><input type="checkbox" /> Finaliser le design</td>
              <td style={styles.td}>Projet Alpha</td>
              <td style={styles.td}><span style={styles.badge('En cours')}>{STATUS['En cours']}</span>En cours</td>
              <td style={styles.td}>
                <button style={styles.btn('#fff', '#1976d2')} onClick={() => setShowModal(true)}>Modifier</button>
                <button style={styles.btn('#fff', '#d32f2f')}>Supprimer</button>
              </td>
            </tr>
            {/* ...autres tâches */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToDoList;