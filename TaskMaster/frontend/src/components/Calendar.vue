<template>
  <div class="calendar-container">
    <h2>📅 Calendar</h2>
    <div class="calendar-grid">
      <div v-for="day in 30" :key="day" class="calendar-day">
        <strong>{{ day }}</strong>
        <ul>
          <li v-for="event in eventsByDay(day)" :key="event.id">{{ event.title }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      events: [
        { id: 1, title: "Call with client", day: 3 },
        { id: 2, title: "Finish report", day: 10 },
        { id: 3, title: "Team meeting", day: 15 }
      ]
    };
  },
  methods: {
    eventsByDay(day) {
      return this.events.filter(event => event.day === day);
    }
  }
};
</script>

<style scoped>
.calendar-container {
  padding: 20px;
}
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
}
.calendar-day {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 80px;
}
</style>
