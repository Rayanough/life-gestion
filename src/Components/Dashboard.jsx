import React, { useState } from 'react';

// Exemple de données fictives
const tabs = [
  { key: 'year', label: 'Progression Annuelle' },
  { key: 'quarter', label: 'Vue Trimestrielle' },
  { key: 'month', label: 'Vue Mensuelle' },
  { key: 'week', label: 'Vue Hebdomadaire' },
  { key: 'day', label: 'Vue Journalière' },
  { key: 'todo', label: 'To-Do List' },
];

const STATUS = {
  'En cours': '🟠',
  'Terminé': '🟢',
  'En retard': '🔴',
};

function getProgressColor(progress) {
  if (progress > 80) return '#4caf50'; // vert
  if (progress >= 40) return '#ff9800'; // orange
  return '#f44336'; // rouge
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('year');
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Exemple de données pour la table
  const data = [
    { id: 1, annee: 2025, projet: 'Projet Alpha', objectif: 'Lancer MVP', avancement: 90, statut: 'Terminé' },
    { id: 2, annee: 2025, projet: 'Projet Beta', objectif: 'Atteindre 1000 users', avancement: 60, statut: 'En cours' },
    { id: 3, annee: 2025, projet: 'Projet Gamma', objectif: 'Définir roadmap', avancement: 30, statut: 'En retard' },
  ];

  // Styles de base (CSS-in-JS pour l’exemple)
  const styles = {
    root: {
      minHeight: '100vh',
      background: theme === 'dark' ? '#242424' : '#fff',
      color: theme === 'dark' ? '#f3f3f3' : '#222',
      fontFamily: 'system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'background 0.3s, color 0.3s',
      padding: 0,
    },
    tabs: {
      display: 'flex',
      gap: 8,
      margin: '32px 0 16px 0',
      flexWrap: 'wrap',
    },
    tab: isActive => ({
      padding: '10px 18px',
      borderRadius: 6,
      background: isActive ? (theme === 'dark' ? '#333' : '#e0e0e0') : 'transparent',
      color: isActive ? (theme === 'dark' ? '#fff' : '#222') : (theme === 'dark' ? '#aaa' : '#666'),
      border: 'none',
      cursor: 'pointer',
      fontWeight: isActive ? 600 : 400,
      outline: 'none',
      transition: 'background 0.2s, color 0.2s',
    }),
    tableWrapper: {
      width: '100%',
      maxWidth: 1100,
      overflowX: 'auto',
      background: theme === 'dark' ? '#292929' : '#fafafa',
      borderRadius: 10,
      boxShadow: theme === 'dark' ? '0 2px 8px #1118' : '0 2px 8px #ccc8',
      marginBottom: 24,
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: 700,
    },
    th: {
      padding: '12px 8px',
      background: theme === 'dark' ? '#222' : '#eee',
      color: theme === 'dark' ? '#fff' : '#222',
      fontWeight: 600,
      textAlign: 'left',
      borderBottom: theme === 'dark' ? '1px solid #333' : '1px solid #ddd',
    },
    td: {
      padding: '10px 8px',
      borderBottom: theme === 'dark' ? '1px solid #333' : '1px solid #eee',
      verticalAlign: 'middle',
    },
    progressBar: progress => ({
      height: 10,
      borderRadius: 5,
      background: '#444',
      width: '100%',
      marginTop: 4,
      marginBottom: 4,
      overflow: 'hidden',
      position: 'relative',
    }),
    progressFill: progress => ({
      width: `${progress}%`,
      height: '100%',
      background: getProgressColor(progress),
      transition: 'width 0.4s',
    }),
    badge: statut => ({
      fontSize: 22,
      marginRight: 6,
      verticalAlign: 'middle',
    }),
    btn: (color, bg) => ({
      padding: '6px 14px',
      borderRadius: 5,
      border: 'none',
      background: bg,
      color: color,
      cursor: 'pointer',
      marginRight: 6,
      fontWeight: 500,
      transition: 'background 0.2s, color 0.2s',
    }),
    legend: {
      marginTop: 24,
      fontSize: 15,
      background: theme === 'dark' ? '#222' : '#eee',
      color: theme === 'dark' ? '#fff' : '#222',
      borderRadius: 8,
      padding: '12px 18px',
      maxWidth: 600,
      textAlign: 'left',
    },
    themeSwitch: {
      position: 'absolute',
      top: 18,
      right: 24,
      background: 'none',
      border: 'none',
      color: theme === 'dark' ? '#fff' : '#222',
      fontSize: 18,
      cursor: 'pointer',
    },
    filterBtn: {
      ...this?.btn?.('#fff', '#1976d2'),
      marginLeft: 8,
      marginBottom: 12,
    },
    addBtn: {
      ...this?.btn?.('#fff', '#43a047'),
      marginBottom: 12,
    },
    searchInput: {
      padding: '7px 12px',
      borderRadius: 5,
      border: '1px solid #888',
      marginRight: 10,
      marginBottom: 12,
      fontSize: 15,
      background: theme === 'dark' ? '#181818' : '#fff',
      color: theme === 'dark' ? '#fff' : '#222',
    },
    centered: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#000a',
      zIndex: 1000,
      ...this?.centered,
    },
    modal: {
      background: theme === 'dark' ? '#232323' : '#fff',
      color: theme === 'dark' ? '#fff' : '#222',
      borderRadius: 12,
      padding: 32,
      minWidth: 320,
      maxWidth: 400,
      boxShadow: '0 8px 32px #0008',
      position: 'relative',
    },
    closeModal: {
      position: 'absolute',
      top: 10,
      right: 16,
      background: 'none',
      border: 'none',
      color: theme === 'dark' ? '#fff' : '#222',
      fontSize: 22,
      cursor: 'pointer',
    },
  };

  // Modal de formulaire (exemple simplifié)
  const Modal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <button style={styles.closeModal} onClick={() => setShowModal(false)}>×</button>
        <h3>Ajouter / Modifier une entrée</h3>
        <form>
          <label>Projet<br /><input style={styles.searchInput} type="text" placeholder="Nom du projet" /></label><br />
          <label>Objectif<br /><textarea style={{...styles.searchInput, height: 60}} placeholder="Décris l'objectif" /></label><br />
          <label>Statut<br />
            <select style={styles.searchInput}>
              <option>En cours</option>
              <option>Terminé</option>
              <option>En retard</option>
            </select>
          </label><br />
          <label>Avancement (%)<br /><input style={styles.searchInput} type="number" min={0} max={100} /></label><br />
          <button style={styles.addBtn} type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );

  // Table générique pour chaque onglet (exemple)
  const Table = () => (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Année</th>
            <th style={styles.th}>Projet</th>
            <th style={styles.th}>Objectif</th>
            <th style={styles.th}>Avancement</th>
            <th style={styles.th}>Statut</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td style={styles.td}>{row.annee}</td>
              <td style={styles.td}>{row.projet}</td>
              <td style={styles.td}>{row.objectif}</td>
              <td style={styles.td}>
                <div style={styles.progressBar(row.avancement)}>
                  <div style={styles.progressFill(row.avancement)} />
                </div>
                {row.avancement}%
              </td>
              <td style={styles.td}>
                <span style={styles.badge(row.statut)}>{STATUS[row.statut]}</span>
                <span>{row.statut}</span>
              </td>
              <td style={styles.td}>
                <button style={styles.btn('#fff', '#1976d2')} onClick={() => setShowModal(true)}>Modifier</button>
                <button style={styles.btn('#fff', '#d32f2f')}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // To-Do List avec recherche (exemple simplifié)
  const TodoList = () => (
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

  return (
    <div style={styles.root}>
      <button style={styles.themeSwitch} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <h1 style={{marginTop: 32, marginBottom: 0, fontWeight: 700}}>Tableau de bord stratégique</h1>
      <nav style={styles.tabs}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            style={styles.tab(activeTab === tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <div style={{width: '100%', maxWidth: 1150}}>
        {activeTab !== 'todo' && (
        <div style={{ marginBottom: 12, display: 'flex', gap: 12 }}>
            <button style={styles.filterBtn}>Filtrer</button>
            <button style={styles.addBtn} onClick={() => setShowModal(true)}>Ajouter</button>
        </div>
        )}
        {activeTab === 'todo' ? <TodoList /> : <Table />}
      </div>
      {showModal && <Modal />}
      <div style={styles.legend}>
        <b>Légende :</b><br />
        <span style={{color:'#4caf50'}}>🟢 Terminé (avancement &gt; 80%)</span> &nbsp;|&nbsp;
        <span style={{color:'#ff9800'}}>🟠 En cours (40-80%)</span> &nbsp;|&nbsp;
        <span style={{color:'#f44336'}}>🔴 En retard (&lt; 40%)</span><br />
        <span>Statuts : En cours, Terminé, En retard</span>
      </div>
    </div>
  );
}

export default Dashboard;