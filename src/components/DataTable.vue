<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>
    <div class="laptop-table">
      <div class="table-column">
        <div class="table-column__cell column-cell" v-for="column in columns" :key="column.id"
          :style="{ maxWidth: column.width }">
          <p class="column-cell__name">{{ column.label }}</p>
          <div class="table-row">
            <div class="table-row__cell row-cell" v-for="row in rows" :key="row.id">
              <span>{{ row[column.prop] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-table">
      <div class="mobile-table__item mobile-item" v-for="row in rows" :key="row.id">
        <div class="mobile-item__row item-row" v-for="column in columns" :key="column.id">
          <p class="item-row__name">{{ column.label }}</p>
          <p class="item-row__value">{{ row[column.prop] }}</p>
        </div>
      </div>
    </div>
    <div class="data-table__paginator">
      <ui-pagination v-model="page" :pages="pageCount" :countRowsOnPage="countRowsOnPage" />
    </div> <div class="">{{ tttt() }}</div>
  </div>
</template>

<script>

import getPayments from '@/mocks/getPayments';

export default {

  name: 'DataTable',

  props: {
    rows: {
      type: Array,
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    page: 1,
    pageSize: 4,
    moneyFilter: 0,
  }),

  computed: {
    pageCount() {
      console.log(Math.ceil(this.rows.length / this.pageSize));
      return Math.ceil(this.rows.length / this.pageSize);
    },
    countRowsOnPage() {
      console.log(Math.ceil(this.rows.length / this.pageCount));
      return Math.ceil(this.rows.length / this.pageCount);
    },
  },
  methods: {
    tttt() {
      getPayments().then((result) => console.log(result.data[0].date));
    },
  },
  watch: {
    widthScreen(newValue) {
      console.log(`yes, computed property changed: ${newValue}`);
    },
  },
};
</script>
