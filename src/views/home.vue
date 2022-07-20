<template>
  <div class="home">
    <v-container>
      <v-form v-model="valid" @submit.prevent="loadItems">
        <v-row>
          <v-col cols="12" class="d-flex align-center">
            <div>
              <h3>Кадастровый номер</h3>
              <v-text-field
                  v-model="kadastr"
                  :rules="[rules.required, rules.filter]"
                  outlined
                  required

              ></v-text-field>
            </div>
            <v-btn
                class="ml-10"
                type="submit"
                outlined
                :loading="loading"
                :disabled="!valid"
            >
              Найти
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col cols="12" v-if="list">
          <vue-good-table
              :columns="headers"
              :rows="list"

          >
            <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'number'">
              <span class="home-table__link" @click="loadItem(props.formattedRow)">{{ props.row.number }}</span>
            </span>
              <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
            </template>
          </vue-good-table>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col cols="auto">
          <v-dialog
              transition="dialog-top-transition"
              max-width="1000"
              v-model="dialog"
              scrollable
              v-if="dialog"
          >

            <v-card>
              <v-toolbar

                  class="ml-auto"
              >
                <v-card-actions class="justify-end">
                  <v-btn text @click="dialog = false">Закрыть</v-btn>
                </v-card-actions>
              </v-toolbar>
              <v-card-text class="mt-4">
                <vue-good-table
                    :columns="headersItem"
                    :rows="itemInfo"

                >
                </vue-good-table>
              </v-card-text>

            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import 'vue-good-table/dist/vue-good-table.css'
import {VueGoodTable} from 'vue-good-table';

export default {
  name: 'Home',
  components: {
    VueGoodTable,
  },
  data() {
    return {
      dialog: false,
      valid: false,
      kadastr: '',
      loading: false,
      rules: {
        filter: v => !!(v || '').match(/^(\d|:)+(:\d+)*$/) || 'Пожалуйста, напишите правильный номер',
        required: v => v.length > 5 || 'Минимальная длина номера 5',
      },
      headers: [
        {label: '#', field: 'id',},
        {label: 'Кадастровый номер', field: 'number'},
        {label: 'Тип', field: 'type'},
        {label: 'Адрес', field: 'address'},
      ],
      headersItem: [
        {label: 'Дата записи', field: 'dateCreated',},
        {label: 'Наименование', field: 'name'},
        {label: 'Обременения', field: 'encumbrances'},
      ],

    }
  },
  computed: {
    ...mapGetters([
      'items',
      'item'
    ]),
    list() {
      return this.items?.map((el, index) => ({
        id: ++index,
        number: el.objectCn,
        type: this.filterType(el.objectType),
        address: el.addressNotes,
        objectId: el.objectId
      }))
    },
    itemInfo() {
      let arr = this.item;
      console.log(arr)
      console.log(this.filterTypeItem(arr))
      return [
        {
          dateCreated: arr.objectData?.dateCreated,
          name: arr.objectData?.name ? arr.objectData?.name : arr.objectData?.objectDesc,
          encumbrances: this.filterTypeItem(arr)
        }
      ]
    }
  },
  methods: {
    loadItems() {
      this.loading = true;
      const url = `http://localhost:8080/fir_lite_rest/api/gkn/fir_objects/${this.kadastr}*`;
      this.$store.dispatch('fetchItems', url)
          .then(() => {
            this.loading = false;
          })
          .catch((err) => {
            console.log(err)
          })
    },
    loadItem(item) {
      let objectId;
      this.list.forEach(el => {
        if (el.number === item.number) {
          objectId = el.objectId
        }
      })
      let url = `http://localhost:8080/fir_lite_rest/api/gkn/fir_lite_object/${objectId}`
      this.$store.dispatch('fetchItem', url)
          .then(() => {
            this.loading = false;
            this.dialog = true;
          })
          .catch((err) => {
            console.log(err)
          })
    },
    filterType(a) {
      switch (a) {
        case 'parcel':
          return 'Земельный участок'

        case 'flat':
          return 'Квартира'

        case 'building':
          return 'Здание'

        case 'construction':
          return 'Сооружение'

        default:
          return a
      }
    },
    filterTypeItem(arr) {
      switch (arr.type) {
        case 'parcel':
          console.log('1')
          return arr.objectData?.parcelData?.encumbrancesExists ? 'Зарегистрированы': 'Не зарегистрированы'

        case 'building':
          console.log('2')
          return arr.objectData?.building?.encumbrancesExists ? 'Зарегистрированы': 'Не зарегистрированы'

        case 'construction':
          console.log('3')
          return arr.objectData?.construction?.encumbrancesExists ? 'Зарегистрированы': 'Не зарегистрированы'

        case 'flat':
          console.log('4')
          return arr.objectData?.flat?.encumbrancesExists ? 'Зарегистрированы': 'Не зарегистрированы'

        default:
          return null
      }
    }
  }

}
</script>
<style lang="scss">
.home {
  padding: 24px;
  @include up($sm) {
    padding: 60px;
  }
  @include up($md) {
    padding: 80px;
  }

  .v-input {
    width: 400px;
  }

  &-table__link {
    cursor: pointer;
    @include transition();

    &:hover {
      color: $primary-1;
    }
  }
}
</style>
