<template>
  <input type="text" v-model="valueInput" @input="$emit('valueChange', $event.target.value)" @change="filteredNames" class="ui-money" />
</template>

<script>
export default {

  name: 'UiMoney',

  props: {
    value: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      valueInput: '',
      oldNum: '',
    };
  },
  computed: {
  },

  methods: {
    filteredNames() {
      if (/[а-яё]+|[a-z]+|[A-Z]+|[А-ЯЁ]/g.test(this.valueInput)) {
        this.valueInput = '';
      } else {
        this.valueInput = this.valueInput.replace(',', '.');
        this.valueInput = (Number(this.valueInput).toLocaleString('ru-RU')).replace(',', '.');
      }
    },
  },
};
</script>
