<template>
  <div class="data-table">
    <div class="data-table__filter">
      <ui-money v-model="moneyFilter" />
    </div>
    <div class="table-column">
      <div class="table-column__cell column-cell" v-for="column in columns" :key="column.id"
        :style="{ maxWidth: column.width }">
        <span class="column-cell__name">{{ column.label }}</span>
        <div class="table-row">
          <div class="table-row__cell row-cell" v-for="row in rows" :key="row.id">
            <span>{{ row[column.prop] }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="data-table__paginator">
      <ui-pagination v-model="page" :pages="pageCount" />
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
  }),

  computed: {
    pageCount() {
      return Math.ceil(this.rows.length / this.pageSize);
    },
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.data-table {
  &__filter {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 24px;
  }

  .table-column {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__cell {
      width: 100%;
      padding: 12px 0;
      border: 1px solid currentColor;
      text-align: center;
    }

    &__cell:not(:last-child) {
      border-right: transparent;
    }

    .column-cell {
      &__name {
        font-weight: 600;
      }
    }

  }

  .table-row {
    .row-cell {
      padding: 12px 0;
      border-top: 1px solid currentColor;

    }
  }
}
</style>
