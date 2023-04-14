<template>
  <main class="container mt-md-5">

    <!-- Loading spinner -->
    <ui-spinner v-if="isLoading" />

    <template v-else>
      <ui-alert v-if="isCached" type="success" header="Data was cached!">
        <template #default>
          <p>You can clear cache and load data again.</p>
        </template>
        <template #footer>
          <ui-button type="primary">
            Clear cache
          </ui-button>
        </template>
      </ui-alert>

      <data-table :rows="data" :columns="columns" />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {

  name: 'AppContent',

  data: () => ({
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: '15%',
      },
      {
        label: 'Date',
        prop: 'date',
        width: '20%',
      },
      {
        label: 'Name',
        prop: 'name',
        width: '30%',
      },
      {
        label: 'Money',
        prop: 'money',
        width: '35%',
      },
    ],
    data: [
      {
        id: 1,
        name: 'Bob Lee',
        money: 1000,
        date: '2020-02-24',
      },
      {
        id: 2,
        name: 'John Seek',
        money: 1999.99,
        date: '2020-02-25',
      },
      {
        id: 3,
        name: 'Harry Smith',
        money: 3000.5,
        date: '2020-02-26',
      },
      {
        id: 4,
        name: 'Alex Morphy',
        money: 4000,
        date: '2020-02-27',
      },
      {
        id: 5,
        name: 'Ben Gold',
        money: 5000,
        date: '2020-02-28',
      },
      {
        id: 6,
        name: 'Tim Black',
        money: 10000,
        date: '2020-02-28',
      },
      {
        id: 7,
        name: 'Jimmy Elephant',
        money: 1000000,
        date: '2020-02-30',
      },
    ],
  }),

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
  },

  created() {
    this.load();
  },

  methods: {
    ...mapActions([
      'load',
    ]),
  },
};
</script>
