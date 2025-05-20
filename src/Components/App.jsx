// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Onglets du dashboard
const tabs = [
  { key: 'year', label: 'Progression Annuelle' },
  { key: 'quarter', label: 'Vue Trimestrielle' },
  { key: 'month', label: 'Vue Mensuelle' },
  { key: 'week', label: 'Vue Hebdomadaire' },
  { key: 'day', label: 'Vue Journalière' },
  { key: 'todo', label: 'To-Do List' },
];

// Constantes pour statuts avec émojis
const STATUS = {
  'En cours': '🟠',
  'Terminé': '🟢',
  'En retard': '🔴',
  'Bloqué': '🔴',
  'À faire': '⚪',
};

// Données Annuelles
const YEARLY_DATA = [
  { id: 1, annee: 'Année 1', periode: 'Octobre 2024 → Octobre 2025', objectif: 'Création MVP CallZy', revenue: '50K€', croissance: '+10%', avancement: 65, statut: 'En cours' },
  { id: 2, annee: 'Année 2', periode: 'Octobre 2025 → Octobre 2026', objectif: 'Scale CallZy + MVP PhoneSafe', revenue: '150K€', croissance: '+200%', avancement: 25, statut: 'En cours' },
  { id: 3, annee: 'Année 3', periode: 'Octobre 2026 → Octobre 2027', objectif: 'Automatisation complète', revenue: '400K€', croissance: '+166%', avancement: 0, statut: 'À faire' },
  { id: 4, annee: 'Année 4', periode: 'Octobre 2027 → Octobre 2028', objectif: 'Expansion internationale', revenue: '1M€', croissance: '+150%', avancement: 0, statut: 'À faire' },
  { id: 5, annee: 'Année 5', periode: 'Octobre 2028 → Octobre 2029', objectif: 'Acquisition stratégiques', revenue: '2M€', croissance: '+100%', avancement: 0, statut: 'À faire' },
  { id: 6, annee: 'Année 6', periode: 'Octobre 2029 → Octobre 2030', objectif: 'Diversification produits', revenue: '5M€', croissance: '+150%', avancement: 0, statut: 'À faire' },
];

// Données Trimestrielles
const QUARTERLY_DATA = [
  { id: 1, yearId: 1, trimestre: 'T2 2025', projet: 'CallZy', livrable: 'Infrastructure offshore complète', avancement: 90, statut: 'Terminé' },
  { id: 2, yearId: 1, trimestre: 'T3 2025', projet: 'CallZy', livrable: 'Automatisation tunnel de vente', avancement: 60, statut: 'En cours' },
  { id: 3, yearId: 1, trimestre: 'T3 2025', projet: 'PhoneSafe', livrable: 'Prototype UI fonctionnel', avancement: 30, statut: 'En retard' },
  { id: 4, yearId: 2, trimestre: 'T4 2025', projet: 'PhoneSafe', livrable: 'MVP complet en beta', avancement: 20, statut: 'En cours' },
  { id: 5, yearId: 2, trimestre: 'T1 2026', projet: 'Rayan', livrable: 'Routine sportive stabilisée', avancement: 45, statut: 'En cours' },
];

// Données Mensuelles
const MONTHLY_DATA = [
  { id: 1, quarterId: 2, mois: 'Mai 2025', projet: 'CallZy', objectif: 'Pipeline de génération de leads', avancement: 75, statut: 'En cours' },
  { id: 2, quarterId: 2, mois: 'Juin 2025', projet: 'CallZy', objectif: 'Dashboard analytics ventes', avancement: 20, statut: 'En cours' },
  { id: 3, quarterId: 3, mois: 'Mai 2025', projet: 'PhoneSafe', objectif: 'Correction bugs UI majeurs', avancement: 40, statut: 'En cours' },
  { id: 4, quarterId: 3, mois: 'Juin 2025', projet: 'PhoneSafe', objectif: 'Tests utilisateurs panel beta', avancement: 0, statut: 'À faire' },
  { id: 5, quarterId: 5, mois: 'Mai 2025', projet: 'Rayan', objectif: '12 sessions sport/mois', avancement: 58, statut: 'En cours' },
];

// Données Hebdomadaires
const WEEKLY_DATA = [
  { id: 1, monthId: 1, semaine: 'S20 (13-19 mai)', projet: 'CallZy', action: 'Setup Google Ads API', type: 'Focus', avancement: 100, statut: 'Terminé' },
  { id: 2, monthId: 1, semaine: 'S20 (13-19 mai)', projet: 'CallZy', action: 'Intégration Zapier webhook', type: 'Blocage', avancement: 65, statut: 'En cours' },
  { id: 3, monthId: 3, semaine: 'S20 (13-19 mai)', projet: 'PhoneSafe', action: 'Corriger affichage contacts', type: 'Focus', avancement: 50, statut: 'En cours' },
  { id: 4, monthId: 5, semaine: 'S20 (13-19 mai)', projet: 'Rayan', action: '3 séances course à pied', type: 'Habitude', avancement: 67, statut: 'En cours' },
];

// Données Journalières
const DAILY_DATA = [
  { id: 1, weekId: 4, jour: 'Lundi 13 mai', 
    timeblocks: [
      { id: 1, horaire: '06:00-07:30', activite: 'Réveil + Lecture', complete: true },
      { id: 2, horaire: '07:30-09:00', activite: 'Sport (Course 5km)', complete: true },
      { id: 3, horaire: '09:00-12:00', activite: 'CallZy: Analytics', complete: true },
      { id: 4, horaire: '12:00-13:00', activite: 'Pause déjeuner', complete: true },
      { id: 5, horaire: '13:00-16:00', activite: 'PhoneSafe: Debug UI', complete: true },
      { id: 6, horaire: '16:00-18:00', activite: 'Calls clients', complete: false },
      { id: 7, horaire: '18:00-20:00', activite: 'Planning + Admin', complete: false }
    ],
    score: 5,
    scoreMax: 7,
    avancement: 71
  },
  { id: 2, weekId: 4, jour: 'Mardi 14 mai', 
    timeblocks: [
      { id: 1, horaire: '06:00-07:30', activite: 'Réveil + Lecture', complete: true },
      { id: 2, horaire: '07:30-09:00', activite: 'Sport (Musculation)', complete: false },
      { id: 3, horaire: '09:00-12:00', activite: 'CallZy: Onboarding', complete: true },
      { id: 4, horaire: '12:00-13:00', activite: 'Pause déjeuner', complete: true },
      { id: 5, horaire: '13:00-16:00', activite: 'PhoneSafe: API calls', complete: true },
      { id: 6, horaire: '16:00-18:00', activite: 'Calls offshore', complete: true },
      { id: 7, horaire: '18:00-20:00', activite: 'Veille tech + Apprentissage', complete: true }
    ],
    score: 6,
    scoreMax: 7,
    avancement: 86
  },
];

// Données tâches
const TODO_DATA = [
  { id: 1, weekId: 2, tache: 'Configurer Zapier webhook pour CRM', projet: 'CallZy', datePrevue: '2025-05-16', priorite: 'Haute', avancement: 65, statut: 'En cours' },
  { id: 2, weekId: 3, tache: 'Résoudre bug scroll liste contacts', projet: 'PhoneSafe', datePrevue: '2025-05-15', priorite: 'Critique', avancement: 80, statut: 'En cours' },
  { id: 3, weekId: 3, tache: 'Optimiser animations transitions', projet: 'PhoneSafe', datePrevue: '2025-05-18', priorite: 'Moyenne', avancement: 20, statut: 'En cours' },
  { id: 4, weekId: 4, tache: 'Réserver sessions coach sportif', projet: 'Rayan', datePrevue: '2025-05-14', priorite: 'Basse', avancement: 0, statut: 'À faire' },
];

// Fonction utilitaire pour obtenir la couleur en fonction de l'avancement
function getProgressColor(progress) {
  if (progress > 80) return '#4caf50';
  if (progress >= 40) return '#ff9800';
  return '#f44336';
}

// Fonction de filtrage des données par ID parent
function filterByParentId(data, parentIdField, parentId) {
  if (parentId === 0) return data; // Si 0, retourne toutes les données
  return data.filter(item => item[parentIdField] === parentId);
}

// Composant réutilisable pour la barre de progression
function ProgressBar({ progress, theme }) {
  return (
    <div style={{
      height: 10,
      borderRadius: 5,
      background: theme === 'dark' ? '#444' : '#e0e0e0',
      width: '100%',
      marginTop: 4,
      marginBottom: 4,
      overflow: 'hidden',
      position: 'relative',
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        background: getProgressColor(progress),
        transition: 'width 0.4s',
      }} />
    </div>
  );
}

// Composant réutilisable pour le badge de statut
function StatusBadge({ statut }) {
  return (
    <span style={{ fontSize: 22, marginRight: 6, verticalAlign: 'middle' }}>
      {STATUS[statut]}
      <span style={{ fontSize: 14, marginLeft: 4 }}>{statut}</span>
    </span>
  );
}

// Composant pour la vue annuelle
function YearView({ styles, theme, openModal }) {
  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Année</th>
            <th style={styles.th}>Période</th>
            <th style={styles.th}>Objectif stratégique</th>
            <th style={styles.th}>Revenue visé</th>
            <th style={styles.th}>Croissance</th>
            <th style={styles.th}>Avancement</th>
            <th style={styles.th}>Statut</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {YEARLY_DATA.map((row) => (
            <tr key={row.id}>
              <td style={styles.td}>{row.annee}</td>
              <td style={styles.td}>{row.periode}</td>
              <td style={styles.td}>{row.objectif}</td>
              <td style={styles.td}>{row.revenue}</td>
              <td style={styles.td}>{row.croissance}</td>
              <td style={styles.td}>
                <ProgressBar progress={row.avancement} theme={theme} />
                {row.avancement}%
              </td>
              <td style={styles.td}>
                <StatusBadge statut={row.statut} />
              </td>
              <td style={styles.td}>
                <button style={styles.btn('#fff', '#1976d2')} onClick={() => openModal('year', row)}>
                  Modifier
                </button>
                <button style={styles.btn('#fff', '#d32f2f')}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Composant pour la vue trimestrielle
function QuarterView({ styles, theme, openModal }) {
  const [selectedYear, setSelectedYear] = useState(0); // 0 = tous
  const [filteredData, setFilteredData] = useState(QUARTERLY_DATA);

  useEffect(() => {
    setFilteredData(filterByParentId(QUARTERLY_DATA, 'yearId', selectedYear));
  }, [selectedYear]);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <button 
          style={{
            padding: '6px 12px',
            borderRadius: 5,
            cursor: 'pointer',
            background: selectedYear === 0 ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
            color: selectedYear === 0 ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
            border: 'none'
          }}
          onClick={() => setSelectedYear(0)}
        >
          Toutes les années
        </button>
        {YEARLY_DATA.map(year => (
          <button 
            key={year.id}
            style={{
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer',
              background: selectedYear === year.id ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
              color: selectedYear === year.id ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
              border: 'none'
            }}
            onClick={() => setSelectedYear(year.id)}
          >
            {year.annee}
          </button>
        ))}
      </div>
      
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Trimestre</th>
              <th style={styles.th}>Projet</th>
              <th style={styles.th}>Livrable stratégique</th>
              <th style={styles.th}>Avancement</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.trimestre}</td>
                <td style={styles.td}>{row.projet}</td>
                <td style={styles.td}>{row.livrable}</td>
                <td style={styles.td}>
                  <ProgressBar progress={row.avancement} theme={theme} />
                  {row.avancement}%
                </td>
                <td style={styles.td}>
                  <StatusBadge statut={row.statut} />
                </td>
                <td style={styles.td}>
                  <button style={styles.btn('#fff', '#1976d2')} onClick={() => openModal('quarter', row)}>
                    Modifier
                  </button>
                  <button style={styles.btn('#fff', '#d32f2f')}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Composant pour la vue mensuelle
function MonthView({ styles, theme, openModal }) {
  const [selectedQuarter, setSelectedQuarter] = useState(0);
  const [filteredData, setFilteredData] = useState(MONTHLY_DATA);

  useEffect(() => {
    setFilteredData(filterByParentId(MONTHLY_DATA, 'quarterId', selectedQuarter));
  }, [selectedQuarter]);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          style={{
            padding: '6px 12px',
            borderRadius: 5,
            cursor: 'pointer',
            background: selectedQuarter === 0 ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
            color: selectedQuarter === 0 ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
            border: 'none'
          }}
          onClick={() => setSelectedQuarter(0)}
        >
          Tous les trimestres
        </button>
        {QUARTERLY_DATA.map(quarter => (
          <button
            key={quarter.id}
            style={{
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer',
              background: selectedQuarter === quarter.id ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
              color: selectedQuarter === quarter.id ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
              border: 'none'
            }}
            onClick={() => setSelectedQuarter(quarter.id)}
          >
            {quarter.projet} - {quarter.trimestre}
          </button>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Mois</th>
              <th style={styles.th}>Projet</th>
              <th style={styles.th}>Objectif mensuel</th>
              <th style={styles.th}>Avancement</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.mois}</td>
                <td style={styles.td}>{row.projet}</td>
                <td style={styles.td}>{row.objectif}</td>
                <td style={styles.td}>
                  <ProgressBar progress={row.avancement} theme={theme} />
                  {row.avancement}%
                </td>
                <td style={styles.td}>
                  <StatusBadge statut={row.statut} />
                </td>
                <td style={styles.td}>
                  <button style={styles.btn('#fff', '#1976d2')} onClick={() => openModal('month', row)}>
                    Modifier
                  </button>
                  <button style={styles.btn('#fff', '#d32f2f')}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Composant pour la vue hebdomadaire
function WeekView({ styles, theme, openModal }) {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [filteredData, setFilteredData] = useState(WEEKLY_DATA);

  useEffect(() => {
    setFilteredData(filterByParentId(WEEKLY_DATA, 'monthId', selectedMonth));
  }, [selectedMonth]);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          style={{
            padding: '6px 12px',
            borderRadius: 5,
            cursor: 'pointer',
            background: selectedMonth === 0 ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
            color: selectedMonth === 0 ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
            border: 'none'
          }}
          onClick={() => setSelectedMonth(0)}
        >
          Tous les mois
        </button>
        {MONTHLY_DATA.map(month => (
          <button
            key={month.id}
            style={{
              padding: '6px 12px',
              borderRadius: 5,
              cursor: 'pointer',
              background: selectedMonth === month.id ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
              color: selectedMonth === month.id ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
              border: 'none'
            }}
            onClick={() => setSelectedMonth(month.id)}
          >
            {month.projet} - {month.mois}
          </button>
        ))}
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Semaine</th>
              <th style={styles.th}>Projet</th>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Type</th>
              <th style={styles.th}>Avancement</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.id}>
                <td style={styles.td}>{row.semaine}</td>
                <td style={styles.td}>{row.projet}</td>
                <td style={styles.td}>{row.action}</td>
                <td style={styles.td}>
                  <span style={{
                    display: 'inline-block',
                    padding: '3px 8px',
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 600,
                    background: row.type === 'Focus' ? '#2196f3' : 
                                row.type === 'Blocage' ? '#f44336' : '#4caf50',
                    color: '#fff'
                  }}>
                    {row.type}
                  </span>
                </td>
                <td style={styles.td}>
                  <ProgressBar progress={row.avancement} theme={theme} />
                  {row.avancement}%
                </td>
                <td style={styles.td}>
                  <StatusBadge statut={row.statut} />
                </td>
                <td style={styles.td}>
                  <button style={styles.btn('#fff', '#1976d2')} onClick={() => openModal('week', row)}>
                    Modifier
                  </button>
                  <button style={styles.btn('#fff', '#d32f2f')}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Composant pour la vue journalière
function DayView({ styles, theme, openModal }) {
  const [selectedDay, setSelectedDay] = useState(DAILY_DATA[0].id);
  
  const currentDay = DAILY_DATA.find(day => day.id === selectedDay);

  return (
    <>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, overflowX: 'auto', paddingBottom: 6 }}>
        {DAILY_DATA.map(day => (
          <button
            key={day.id}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
              background: day.id === selectedDay ? '#1976d2' : (theme === 'dark' ? '#333' : '#e0e0e0'),
              color: day.id === selectedDay ? '#fff' : (theme === 'dark' ? '#f3f3f3' : '#333'),
              border: 'none',
              fontWeight: day.id === selectedDay ? 600 : 400,
            }}
            onClick={() => setSelectedDay(day.id)}
          >
            {day.jour}
          </button>
        ))}
      </div>

      {currentDay && (
        <>
          <div style={{
            background: theme === 'dark' ? '#333' : '#f5f5f5',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ margin: 0 }}>Score du jour</h3>
              <div style={{
                height: 8,
                borderRadius: 4,
                background: theme === 'dark' ? '#444' : '#e0e0e0',
                width: '100%',
                marginTop: 8,
              }}>
                <div style={{
                  width: `${currentDay.avancement}%`,
                  height: '100%',
                  borderRadius: 4,
                  background: getProgressColor(currentDay.avancement),
                  transition: 'width 0.4s',
                }} />
              </div>
            </div>
            <div style={{
              fontSize: 32,
              fontWeight: 700,
              color: theme === 'dark' ? '#fff' : '#333',
            }}>
              {currentDay.score}/{currentDay.scoreMax}
            </div>
          </div>

          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Horaire</th>
                  <th style={styles.th}>Activité</th>
                  <th style={styles.th}>Complété</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDay.timeblocks.map(block => (
                  <tr key={block.id} style={{
                    background: block.complete ? (theme === 'dark' ? '#2d3b2d' : '#f1f8e9') : 'transparent'
                  }}>
                    <td style={styles.td}>{block.horaire}</td>
                    <td style={styles.td}>{block.activite}</td>
                    <td style={styles.td}>
                      <input 
                        type="checkbox" 
                        checked={block.complete} 
                        style={{ width: 20, height: 20, cursor: 'pointer' }}
                        readOnly
                      />
                    </td>
                    <td style={styles.td}>
                      <button 
                        style={styles.btn('#fff', '#1976d2')} 
                        onClick={() => openModal('timeblock', block)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

// Composant pour la vue Todo
function TodoView({ styles, theme, openModal }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  
  // Filtrer les tâches en fonction de la recherche et du filtre de priorité
  const filteredTodos = TODO_DATA.filter(todo => {
    const matchesSearch = searchQuery === '' || 
                        todo.tache.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        todo.projet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === '' || todo.priorite === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  return (
    <>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Rechercher une tâche..."
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
            minWidth: 200,
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select 
          style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
            background: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#333',
          }}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Toutes priorités</option>
          <option value="Critique">Critique</option>
          <option value="Haute">Haute</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Basse">Basse</option>
        </select>

        <button style={styles.addBtn} onClick={() => openModal('todo')}>
          Ajouter une tâche
        </button>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Tâche</th>
              <th style={styles.th}>Projet</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Priorité</th>
              <th style={styles.th}>Avancement</th>
              <th style={styles.th}>Statut</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTodos.map((todo) => (
              <tr key={todo.id}>
                <td style={styles.td}>{todo.tache}</td>
                <td style={styles.td}>{todo.projet}</td>
                <td style={styles.td}>{todo.datePrevue}</td>
                <td style={styles.td}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: 4,
                    background: todo.priorite === 'Critique' ? '#f44336' :
                                todo.priorite === 'Haute' ? '#ff9800' :
                                todo.priorite === 'Moyenne' ? '#2196f3' : '#4caf50',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 500,
                  }}>
                    {todo.priorite}
                  </span>
                </td>
                <td style={styles.td}>
                  <ProgressBar progress={todo.avancement} theme={theme} />
                  {todo.avancement}%
                </td>
                <td style={styles.td}>
                  <StatusBadge statut={todo.statut} />
                </td>
                <td style={styles.td}>
                  <button style={styles.btn('#fff', '#1976d2')} onClick={() => openModal('todo', todo)}>
                    Modifier
                  </button>
                  <button style={styles.btn('#fff', '#d32f2f')}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// Composant pour les formulaires dynamiques
function DynamicForm({ formType, data, closeModal, theme }) {
  const [formData, setFormData] = useState({});
  
  // Initialiser les données du formulaire en fonction du type et des données existantes
  useEffect(() => {
    if (data) {
      setFormData({ ...data });
    } else {
      // Valeurs par défaut en fonction du type de formulaire
      switch (formType) {
        case 'year':
          setFormData({
            annee: '',
            periode: '',
            objectif: '',
            revenue: '',
            croissance: '',
            avancement: 0,
            statut: 'À faire'
          });
          break;
        case 'quarter':
          setFormData({
            yearId: 1,
            trimestre: '',
            projet: '',
            livrable: '',
            avancement: 0,
            statut: 'À faire'
          });
          break;
        case 'month':
          setFormData({
            quarterId: 1,
            mois: '',
            projet: '',
            objectif: '',
            avancement: 0,
            statut: 'À faire'
          });
          break;
        case 'week':
          setFormData({
            monthId: 1,
            semaine: '',
            projet: '',
            action: '',
            type: 'Focus',
            avancement: 0,
            statut: 'À faire'
          });
          break;
        case 'todo':
          setFormData({
            weekId: 1,
            tache: '',
            projet: '',
            datePrevue: new Date().toISOString().split('T')[0],
            priorite: 'Moyenne',
            avancement: 0,
            statut: 'À faire'
          });
          break;
        case 'timeblock':
          setFormData({
            horaire: '',
            activite: '',
            complete: false
          });
          break;
        default:
          setFormData({});
      }
    }
  }, [formType, data]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : (type === 'number' ? Number(value) : value)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enregistrement des données:', formData);
    // Ici, vous pourriez implémenter la logique pour sauvegarder les données
    closeModal();
  };

  const getFormTitle = () => {
    const action = data ? 'Modifier' : 'Ajouter';
    switch (formType) {
      case 'year': return `${action} un objectif annuel`;
      case 'quarter': return `${action} un livrable trimestriel`;
      case 'month': return `${action} un objectif mensuel`;
      case 'week': return `${action} une action hebdomadaire`;
      case 'timeblock': return `${action} un bloc horaire`;
      case 'todo': return `${action} une tâche`;
      default: return 'Formulaire';
    }
  };

  const styles = {
    formGroup: {
      marginBottom: 16,
    },
    label: {
      display: 'block',
      marginBottom: 6,
      fontWeight: 500,
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: 6,
      border: theme === 'dark' ? '1px solid #555' : '1px solid #ddd',
      background: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333',
      minHeight: 80,
      boxSizing: 'border-box',
    },
    submitBtn: {
      padding: '10px 16px',
      borderRadius: 6,
      border: 'none',
      background: '#4caf50',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 500,
      marginTop: 16,
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    checkbox: {
      width: 18,
      height: 18,
    }
  };

  // Afficher différents champs en fonction du type de formulaire
  const renderFormFields = () => {
    switch (formType) {
      case 'year':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Année</label>
              <input
                type="text"
                name="annee"
                value={formData.annee || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Année 1"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Période</label>
              <input
                type="text"
                name="periode"
                value={formData.periode || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Octobre 2024 → Octobre 2025"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Objectif stratégique</label>
              <input
                type="text"
                name="objectif"
                value={formData.objectif || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Lancement MVP"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Revenue visé</label>
              <input
                type="text"
                name="revenue"
                value={formData.revenue || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: 50K€"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Croissance</label>
              <input
                type="text"
                name="croissance"
                value={formData.croissance || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: +10%"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Avancement (%)</label>
              <input
                type="number"
                name="avancement"
                value={formData.avancement || 0}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Statut</label>
              <select
                name="statut"
                value={formData.statut || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
                <option value="Bloqué">Bloqué</option>
              </select>
            </div>
          </>
        );

      case 'quarter':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Année</label>
              <select
                name="yearId"
                value={formData.yearId || 1}
                onChange={handleChange}
                style={styles.select}
              >
                {YEARLY_DATA.map(year => (
                  <option key={year.id} value={year.id}>
                    {year.annee}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Trimestre</label>
              <input
                type="text"
                name="trimestre"
                value={formData.trimestre || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: T2 2025"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Projet</label>
              <input
                type="text"
                name="projet"
                value={formData.projet || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: CallZy"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Livrable stratégique</label>
              <textarea
                name="livrable"
                value={formData.livrable || ''}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="ex: Infrastructure offshore complète"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Avancement (%)</label>
              <input
                type="number"
                name="avancement"
                value={formData.avancement || 0}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Statut</label>
              <select
                name="statut"
                value={formData.statut || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
                <option value="Bloqué">Bloqué</option>
              </select>
            </div>
          </>
        );

      case 'month':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Trimestre</label>
              <select
                name="quarterId"
                value={formData.quarterId || 1}
                onChange={handleChange}
                style={styles.select}
              >
                {QUARTERLY_DATA.map(quarter => (
                  <option key={quarter.id} value={quarter.id}>
                    {quarter.projet} - {quarter.trimestre}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mois</label>
              <input
                type="text"
                name="mois"
                value={formData.mois || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Mai 2025"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Projet</label>
              <input
                type="text"
                name="projet"
                value={formData.projet || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: CallZy"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Objectif mensuel</label>
              <textarea
                name="objectif"
                value={formData.objectif || ''}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="ex: Pipeline de génération de leads"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Avancement (%)</label>
              <input
                type="number"
                name="avancement"
                value={formData.avancement || 0}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Statut</label>
              <select
                name="statut"
                value={formData.statut || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
                <option value="Bloqué">Bloqué</option>
              </select>
            </div>
          </>
        );

      case 'week':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Mois</label>
              <select
                name="monthId"
                value={formData.monthId || 1}
                onChange={handleChange}
                style={styles.select}
              >
                {MONTHLY_DATA.map(month => (
                  <option key={month.id} value={month.id}>
                    {month.projet} - {month.mois}
                  </option>
                ))}
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Semaine</label>
              <input
                type="text"
                name="semaine"
                value={formData.semaine || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: S20 (13-19 mai)"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Projet</label>
              <input
                type="text"
                name="projet"
                value={formData.projet || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: CallZy"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Action</label>
              <textarea
                name="action"
                value={formData.action || ''}
                onChange={handleChange}
                style={styles.textarea}
                placeholder="ex: Setup Google Ads API"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Type</label>
              <select
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Focus">Focus</option>
                <option value="Blocage">Blocage</option>
                <option value="Habitude">Habitude</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Avancement (%)</label>
              <input
                type="number"
                name="avancement"
                value={formData.avancement || 0}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Statut</label>
              <select
                name="statut"
                value={formData.statut || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
                <option value="Bloqué">Bloqué</option>
              </select>
            </div>
          </>
        );

      case 'todo':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Tâche</label>
              <input
                type="text"
                name="tache"
                value={formData.tache || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Configurer Zapier webhook"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Projet</label>
              <input
                type="text"
                name="projet"
                value={formData.projet || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: CallZy"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date prévue</label>
              <input
                type="date"
                name="datePrevue"
                value={formData.datePrevue || ''}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Priorité</label>
              <select
                name="priorite"
                value={formData.priorite || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Critique">Critique</option>
                <option value="Haute">Haute</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Avancement (%)</label>
              <input
                type="number"
                name="avancement"
                value={formData.avancement || 0}
                onChange={handleChange}
                style={styles.input}
                min="0"
                max="100"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Statut</label>
              <select
                name="statut"
                value={formData.statut || ''}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="À faire">À faire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
                <option value="En retard">En retard</option>
                <option value="Bloqué">Bloqué</option>
              </select>
            </div>
          </>
        );

      case 'timeblock':
        return (
          <>
            <div style={styles.formGroup}>
              <label style={styles.label}>Horaire</label>
              <input
                type="text"
                name="horaire"
                value={formData.horaire || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: 06:00-07:30"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Activité</label>
              <input
                type="text"
                name="activite"
                value={formData.activite || ''}
                onChange={handleChange}
                style={styles.input}
                placeholder="ex: Réveil + Lecture"
              />
            </div>
            <div style={styles.checkboxContainer}>
              <input
                type="checkbox"
                id="complete"
                name="complete"
                checked={formData.complete || false}
                onChange={handleChange}
                style={styles.checkbox}
              />
              <label htmlFor="complete">
                Activité complétée
              </label>
            </div>
          </>
        );

      default:
        return <p>Type de formulaire non reconnu</p>;
    }
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{getFormTitle()}</h2>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button type="submit" style={styles.submitBtn}>
          Enregistrer
        </button>
      </form>
    </div>
  );
}

// Composant principal
function App() {
  const [activeTab, setActiveTab] = useState('year');
  const [theme, setTheme] = useState('dark');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Ouvrir la modale avec des données spécifiques
  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setShowModal(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setShowModal(false);
    // Réinitialiser après l'animation de fermeture
    setTimeout(() => {
      setModalType(null);
      setModalData(null);
    }, 300);
  };

  // Styles pour l'application
  const styles = {
    root: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  background: theme === 'dark' ? '#242424' : '#fff',
  color: theme === 'dark' ? '#f3f3f3' : '#222',
  fontFamily: 'system-ui, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  transition: 'background 0.3s, color 0.3s',
  margin: '0 !important',
  padding: '0 !important',
  boxSizing: 'border-box',
  overflow: 'hidden',
},
    header: {
      textAlign: 'center',
      margin: '32px 0 16px',
      position: 'relative',
    },
    title: {
      fontSize: 32,
      fontWeight: 450,
      margin: '0 !important',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: 400,
      opacity: 0.8,
      margin: '0 !important',
    },
    tabs: {
      display: 'flex',
      gap: 8,
      margin: '16px 0',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    tab: (isActive) => ({
      padding: '8px 12px',
      borderRadius: 6,
      background: isActive ? (theme === 'dark' ? '#333' : '#e0e0e0') : 'transparent',
      color: isActive ? (theme === 'dark' ? '#fff' : '#222') : (theme === 'dark' ? '#aaa' : '#666'),
      border: 'none',
      cursor: 'pointer',
      fontWeight: isActive ? 600 : 400,
      outline: 'none',
      transition: 'background 0.2s, color 0.2s',
      fontSize: '14px',
    }),
    tabContent: {
      width: '100%',
      maxWidth: '100%',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      padding: '0 16px',
      overflowY: 'auto',
    },
    tableWrapper: {
      width: '100%',
      maxWidth: '100%',
      overflowX: 'auto',
      maxHeight: '70vh',
      overflowY: 'auto',
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
    filterBtn: {
      padding: '6px 14px',
      borderRadius: 5,
      border: 'none',
      background: '#1976d2',
      color: '#fff',
      cursor: 'pointer',
      marginLeft: 8,
      marginBottom: 12,
      fontWeight: 500,
      transition: 'background 0.2s, color 0.2s',
    },
    addBtn: {
      padding: '6px 14px',
      borderRadius: 5,
      border: 'none',
      background: '#43a047',
      color: '#fff',
      cursor: 'pointer',
      marginBottom: 12,
      fontWeight: 500,
      transition: 'background 0.2s, color 0.2s',
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
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: '#000a',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      background: theme === 'dark' ? '#232323' : '#fff',
      color: theme === 'dark' ? '#fff' : '#222',
      borderRadius: 12,
      padding: 32,
      minWidth: 320,
      maxWidth: 480,
      maxHeight: '80vh',
      overflowY: 'auto',
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
  };

  // Afficher la vue correspondante à l'onglet actif
  const renderActiveView = () => {
    switch (activeTab) {
      case 'year':
        return <YearView styles={styles} theme={theme} openModal={openModal} />;
      case 'quarter':
        return <QuarterView styles={styles} theme={theme} openModal={openModal} />;
      case 'month':
        return <MonthView styles={styles} theme={theme} openModal={openModal} />;
      case 'week':
        return <WeekView styles={styles} theme={theme} openModal={openModal} />;
      case 'day':
        return <DayView styles={styles} theme={theme} openModal={openModal} />;
      case 'todo':
        return <TodoView styles={styles} theme={theme} openModal={openModal} />;
      default:
        return <div>Onglet non reconnu</div>;
    }
  };

  return (
    <div style={styles.root}>
      <button 
        style={styles.themeSwitch} 
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        aria-label="Changer de thème" 
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      
      <header style={styles.header}>
        <h1 style={styles.title}>Vision stratégique jusqu'à 30 ans</h1>
        <p style={styles.subtitle}>
          Alignez vos actions quotidiennes avec vos ambitions stratégiques
        </p>
      </header>

      <nav style={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            style={styles.tab(activeTab === tab.key)}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div style={styles.tabContent}>
        {activeTab !== 'todo' && (
          <div style={{ marginBottom: 12, display: 'flex', gap: 12 }}>
            <button style={styles.filterBtn}>Filtrer</button>
            <button style={styles.addBtn} onClick={() => openModal(activeTab)}>
              Ajouter
            </button>
          </div>
        )}

        {renderActiveView()}
      </div>

      <div style={styles.legend}>
        <b>Légende :</b>
        <br />
        <span style={{ color: '#4caf50' }}>🟢 Terminé (avancement &gt; 80%)</span> |{' '}
        <span style={{ color: '#ff9800' }}>🟠 En cours (40-80%)</span> |{' '}
        <span style={{ color: '#f44336' }}>🔴 En retard (&lt; 40%)</span>
        <br />
        <span>Statuts : En cours, Terminé, En retard, Bloqué, À faire</span>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <button style={styles.closeModal} onClick={closeModal}>×</button>
            <DynamicForm 
              formType={modalType} 
              data={modalData} 
              closeModal={closeModal}
              theme={theme}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;