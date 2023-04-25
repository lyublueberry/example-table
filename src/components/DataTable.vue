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
            <div class="table-row__cell row-cell" v-for="row in filterMoney" :key="row.id">
              <span>{{ row[column.prop] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-table">
      <div class="mobile-table__item mobile-item" v-for="row in paginatedData" :key="row.id">
        <div class="mobile-item__row item-row" v-for="column in columns" :key="column.id">
          <p class="item-row__name">{{ column.label }}</p>
          <p class="item-row__value">{{ row[column.prop] }}</p>
        </div>
      </div>
    </div>
    <div class="data-table__paginator">
      <ui-pagination v-model="page" :pages="pageCount" @input="setCurrentPage" />
    </div>
  </div>
</template>

<script>
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
    currentPage: 1,
    serachMoney: '',
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
    paginatedData() {
      const startIndex = this.pageSize * (this.currentPage - 1);
      const endIndex = startIndex + this.pageSize;
      const dataPage = this.rows.slice(startIndex, endIndex);
      return dataPage;
    },
    filterMoney() {
      if (this.moneyFilter > 0) {
        console.log(this.paginatedData, this.moneyFilter);
        const filterData = this.paginatedData.filter((el) => parseFloat(el.money.replace(/\s/g, '')) <= this.moneyFilter);
        return filterData;
      } return this.paginatedData;
    },
  },
  methods: {
    setCurrentPage(valueCurrentPage) {
      this.currentPage = valueCurrentPage;
    },
  },
};
</script>
