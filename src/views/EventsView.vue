<template>
  <div class="page rules">
    <div class="page_header">Events</div>
      <br>
      <div>
        {{events}}
        <div v-if="events.length > 0" class="event-grid">
          <div v-for="event in events" :key="event.id" class="event-card">
            <strong>{{ event.event_name }} </strong> - <b>Where:</b> {{ event.location }}
            <p><b>About: </b>{{ event.description }}</p>
            <br>
            <p><strong>Date:</strong> {{ formatDate(event.event_date) }}</p>

            <div class="card-actions">
              <button @click="editEvent(event)">Edit</button>
              <button @click="deleteEvent(event)">Delete</button>
            </div>
          </div>
        </div>
        <p v-else>No events found.</p>
        <button @click="showCreateModal = true">Add Event</button>
        <Modal v-if="showCreateModal" @close="closeCreateModal">
          <form @submit.prevent="createEvent">
            <input type="text" v-model="newEvent.event_name" placeholder="Event Name" />
            <input type="text" v-model="newEvent.description" placeholder="Description" />
            <input type="text" v-model="newEvent.location" placeholder="Location" />
            <input type="date" v-model="newEvent.event_date" placeholder="Event Date" />
            <button type="submit">Create</button>
          </form>
        </Modal>
        <Modal v-if="showEditModal" @close="closeEditModal">
          <form @submit.prevent="saveEvent">
            <div>ID: {{  editingEvent.id }}</div>
            <div>Date Entered: {{ editingEvent.date_entered }}</div>
            <input type="text" v-model="editingEvent.event_name" placeholder="Event Name" />
            <input type="text" v-model="editingEvent.description" placeholder="Description" />
            <input type="text" v-model="editingEvent.location" placeholder="Location" />
            <input type="date" v-model="editingEvent.event_date" placeholder="Event Date" />
            <input type="boolean" v-model="editingEvent.visible" placeholder="Visible" />
            <button type="submit">Save</button>
          </form>
        </Modal>
        
      </div>
      <p></p>
      <div class="P2 bold">   
        Basic Event Rules for ALL Events
      </div>
      <div class="P2 rules">No politics, violence, loud music, and/or reckless driving.</div>
      <div class="P2 left rules">
        <b>Music</b> - If you're going to play music it needs to be quiet!  
                      Any complaint you will be asked to shut it off.  
                      Most event we will be providing music.<br><br>
        <b>TENTS!!!</b> - Pop up tents MUST be secured safely; they must be weighted down.  <br>
          State Line Rodz NFP. has the right to ask you to take your tent down at any time if not secured or if we deem weather is not permitting for tents.</br>
          If you set up a tent you understand that you are responsible for any damages that tent causes and will be held accountable.<br><br>
        <b>No Touch!</b>  Please don't touch any of the show vehicles or motorcycles!<br><br>
        <b>KIDS</b> - PLEASE keep young kids accompanied by an adults<br><br>
        <b>Parking</b> - No reserved spots unless pre-approved but State Line Rodz prior to event
        If you want to park next to someone... <br class="tab">SHOW UP WITH THEM AT THE SAME TIME<br><br>
        <b>Animals</b> - All animals need to be on a leash and please keep them safely away from show vehicles and motorcycles.<br><br>
        <b>Smoking</b> - Please smoke responsibly (keep away from others, clean up butts, and keep ash away from vehicles/motorcycles)<br>  we would prefer you just do not smoke near/inside the event<br><br>
        <b>Noise</b> - Please no excessive noise; NO yelling, engine revving, engine idling for no reason, loud music<br><br>
        <b>TRASH </b>- Please Please clean up after yourself!  This doesn't just help us with clean up time, but it keeps location owners happy and allowing us to come back!<br><br>
        <b>Registration</b> - Vehicles must be registered to win an award and/or be parked in event<br><br>
        <b>Awards</b> <br>
        <b>Categories</b> - Vehicle/Motorcycle Owner is responsible for picking their category.  Category must be submitted at time or registration at event and cannot be changed after.  Only can register for 1 category, unless particular event says otherwise!<br>
        <b>Judging</b> - Award judging is done by participants ONLY, unless specified by event.  Feel free to give your vehicle/motorcycle a vote in its class.  Participants will be given voting ballet at time or registration and will NOT be given another after.<br>
        Entry number MUST be visible to receive votes<br><br>
        <b>RESPECT!!</b> -
        PLEASE, be respectful of all spectators, promotors, sponsors, and participants.<br>
        There is no need to trash talk any one or cause an altercation at our events!  <br>
        No one is forced to come to our events and because of this we ask only for those to come that can respect us and others! <br>
        If there is a problem, we do have the right to ask you to leave that event and depending on the situation we have the right to not allow you into future events.<br><br>
        <b>Not-For-Profit </b> - please remember we (State Line Rodz NFP.) a not-for-profit organization, all of our events are put on by amazing people that our donating their time for FREE<br><br>
        <b>Sponsor</b> - No sponsor should be disrespected at our events; sponsors are the reason we are able to do these kinds of events!<br><br>
      </div>
  </div>
</template>
  
  <script setup lang="ts">
  import '@/styles/main.css'; 
  // ... (rest of the script remains the same)
  import { ref, onMounted, reactive } from 'vue';
  import type { Event } from '@/types/Event';
  import Modal from '@/components/Modal.vue';
  import { EventService } from '@/services/EventService';  
  
  const events = ref<Event[]>([]);
  const showCreateModal = ref(false);
  const showEditModal = ref(false)
  const editingEvent = reactive<Event>({
    id: 0,
    event_name: '',
    description: '',
    location: '',
    event_date: '',
    date_entered: '',
    visible: false
  });
  const newEvent = reactive<Omit<Event, 'id' >>({
    event_name: '',
    description: '',
    location: '',
    event_date: '',
    date_entered: new Date().toISOString(),
    visible: true,
  });
  
  const loadEvents = async () => {
    try {
      console.log("Getting Events")
      events.value = await EventService.getAll();
      console.log("gotem ", events.value)

    } catch (error) {
      console.error("Error loading events:", error);
      // Handle error appropriately (e.g., display an error message to the user)
    }
  };
  
  onMounted(loadEvents);
  
  const closeCreateModal = () => {
    showCreateModal.value = false;
    Object.assign(newEvent, {
        event_name: '',
        definition: '',
        location: '',
        event_date: '',
        date_entered: new Date().toISOString(),
        visible: true,
      });
  };
  
  const closeEditModal = () => {
      showEditModal.value = false
  }
  
  const createEvent = async () => {
    console.log("Creating")
      try {
          await EventService.create(newEvent)
          closeCreateModal()
          loadEvents()
      } catch (error) {
          console.error("Error creating event:", error)
      }
  }
  
  const deleteEvent = async (event: Event) => {
    if (confirm(`Are you sure you want to delete ${event.event_name}?`)) {
      await EventService.delete(event.id);
      loadEvents();
    }
  };
  
  const editEvent = (event: Event) => {
    Object.assign(editingEvent, event); // Use Object.assign for reactivity
    showEditModal.value = true;
  };
  
  const saveEvent = async () => {
    await EventService.update(editingEvent);
    closeEditModal();
    loadEvents();
  };

  function formatDate(dateString: string | Date): string | null {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }
  </script>
  
  <style scoped>
  .event-grid {
    display: flex;
    flex-direction: column; 
    gap: 10px; /* Adjust gap between cards as needed */
  }

  .event-card {
    border: 1px solid #ccc;
    padding: 15px; /* Reduced padding for compression */
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%; /* Ensure cards take full width */
  }
  .card-actions {
      display: flex;
      gap: 10px;
  }
  </style>