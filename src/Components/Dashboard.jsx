import React from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Tableau de bord - Gestion de Vie</h1>
      <section>
        <h2>Vue Annuelle</h2>
        {/* YearView component ici */}
      </section>
      <section>
        <h2>Vue Trimestrielle</h2>
        {/* QuarterView component ici */}
      </section>
      <section>
        <h2>Vue Mensuelle</h2>
        {/* MonthView component ici */}
      </section>
      <section>
        <h2>Vue Hebdomadaire</h2>
        {/* WeekView component ici */}
      </section>
      <section>
        <h2>Vue Journalière</h2>
        {/* DayView component ici */}
      </section>
    </div>
  );
}

export default Dashboard;