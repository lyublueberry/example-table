<template>
  <input type="text" v-model.trim="valueInput" class="ui-money" />
</template>

<script>
export default {
  name: 'UiMoney',
  props: {
    value: {
      type: [Number, String],
      required: true,
    },
  },
  computed: {
    valueInput: {
      get() {
        return parseFloat(this.value).toLocaleString('ru-RU');
      },
      set(value) {
        let formattedValue = value.replace(',', '.');
        if (Number.isNaN(formattedValue)) {
          formattedValue = '';
        } else {
          formattedValue = parseFloat(formattedValue).toFixed(2);
        }
        if (value !== formattedValue) {
          this.$emit('input', formattedValue);
        }
      },
    },
  },
};
</script>
