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

  computed: {
    ...mapState([
      'isLoading',
      'isCached',
      'data',
    ]),
  },

  created() {
    this.load();
    this.getRows();
  },

  methods: {
    ...mapActions([
      'load',
    ]),
    getRows() {
      return Array.from(getPayments().then((result) => {
        result.data.forEach((item) => {
          const newDate = new Date(item.date);
          const newDay = String(newDate.getDate());
          const newMonth = String(newDate.getMonth());
          const newYear = String(newDate.getFullYear());
          let formateDate = '';
          formateDate = `${newDay}.${newMonth}.${newYear}`;
          const newMoney = item.money.toLocaleString('ru-RU');
          item.date = formateDate;
          item.money = newMoney;
        });
        this.rows = result.data;
        console.log(this.rows);
      }));
    },
  },
};
</script>
