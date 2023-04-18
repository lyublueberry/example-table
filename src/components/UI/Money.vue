<template>
  <input type="text" v-model.trim="valueInput" class="ui-money" />
</template>

<script>
export default {

  name: 'UiMoney',

  props: {
    value: {
      type: [Number, String],
      require: true,
    },
  },
  computed: {
    valueInput: {
      get() {
        return this.value;
      },
      set(value) {
        let formateValue = value;
        if (/[а-яё]+|[a-z]+|[A-Z]+|[А-ЯЁ]/g.test(formateValue)) {
          formateValue.replace('');
        } else {
          formateValue = ((parseFloat(formateValue)).toLocaleString('ru-RU')).replace(',', '.');
        }
        if (value !== formateValue) {
          this.$emit('input', formateValue);
        }
      },
    },
  },
};
</script>
