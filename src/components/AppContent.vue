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

      <data-table :rows="rows" :columns="columns" />
    </template>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import getPayments from '@/mocks/getPayments';

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
    rows: [],
  }),

  watch: {
    data(newData, oldData) {
      this.getRows(newData);
    },
  },

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
    getRows(data) {
      this.rows = data.map((datum) => {
        const item = { ...datum };
        const newDate = new Date(item.date);
        const newDay = newDate.getDate();
        const newMonth = newDate.getMonth();
        const newYear = String(newDate.getFullYear());
        let formateDate = '';
        formateDate = `${newDay}.${newMonth}.${newYear}`;
        const newMoney = item.money.toLocaleString('ru-RU');
        item.date = formateDate;
        item.money = newMoney;
        return item;
      });
    },
  },
};
</script>
