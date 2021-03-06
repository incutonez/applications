<template>
  <FlexContainer :class="mainCls">
    <SearchForm :direction="FlexDirections.COLUMN"
                :width="300"
                :margin="'0 10px 0 0'"
                title="Search"
                :hide-clear-btn="false"
                :hide-search-btn="false"
                :hide-reset-btn="false"
                @search="onClickSearchBtn">
      <JefField v-model="search.Position"
                label="Position" />
      <JefField v-model="search.PositionType"
                label="Position Type" />
      <JefField v-model="search.Link"
                label="Link" />
      <JefField v-model="search.CreateDate"
                label="Create Date"
                type="date" />
      <JefCheckbox v-model="search.CompanyId"
                   label="Company"
                   :hidden="true" />
      <JefSpacer />
    </SearchForm>
    <FlexContainer extra-cls="right"
                   :grow="2"
                   :direction="FlexDirections.COLUMN">
      <JefGrid :columns="columns"
               :store="viewStore"
               :grow="1"
               title="Applications"
               :multi-sort="true">
        <template #tools>
          <JefButton :icon="Icons.REFRESH"
                     :icon-only="true"
                     @click="onClickRefreshButton" />
        </template>
      </JefGrid>
    </FlexContainer>
    <RouterView />
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {FlexAlignments, TextAlignments} from '@/statics/Flex';
import Store from '@/classes/Store';
import ColumnTypes from '@/statics/ColumnTypes';
import JefGrid from '@/components/base/Grid.vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefField from '@/components/base/Field.vue';
import JefCheckbox from '@/components/base/Checkbox.vue';
import JefSpacer from '@/components/base/Spacer.vue';
import SearchForm from '@/components/base/SearchForm.vue';
import JefButton from '@/components/base/Button.vue';
import ICompany from '@/interfaces/ICompany';
import Application from '@/models/Application';
import IApplication from '@/interfaces/IApplication';
import Formatters from '@/statics/Formatters';
import Icons from '@/statics/Icons';
import {IFieldValue} from '@/interfaces/Components';
import ChildRoute from '@/mixins/ChildRoute';
import Company from '@/models/Company';

export default defineComponent({
  name: 'ApplicationsSearch',
  components: {
    JefButton,
    SearchForm,
    JefSpacer,
    JefCheckbox,
    JefField,
    FlexContainer,
    JefGrid
  },
  mixins: [
    ChildRoute
  ],

  data() {
    return {
      viewStore: new Store(Application),
      baseRoutes: [
        'applicationSearch'
      ],
      search: {
        Position: null,
        PositionType: null,
        Link: null,
        CreateDate: null,
        // TODO: Wire up
        CompanyId: null
      },
      columns: [{
        type: ColumnTypes.Expander,
        width: 24,
        align: FlexAlignments.CENTER,
        formatter(value: boolean, record: Company) {
          return record.showExpander();
        }
      }, {
        type: ColumnTypes.Action,
        width: 65,
        formatter: (value: IFieldValue, record: IApplication) => {
          const editAction = Icons.getActionIcon({
            icon: Icons.EDIT,
            disabled: record.canEdit(),
            handlers: {
              click: () => {
                this.$router.push({
                  name: 'applicationDetails',
                  params: {
                    Id: record.Id
                  }
                });
              }
            }
          });
          const deleteAction = Icons.getActionIcon({
            icon: Icons.DELETE,
            disabled: record.canDelete(),
            handlers: {
              click: () => {
                // TODO: impl
              }
            }
          });
          return [editAction, deleteAction];
        }
      }, {
        text: 'Id',
        field: 'Id',
        type: ColumnTypes.Number,
        align: TextAlignments.RIGHT,
        width: 50
      }, {
        text: 'Position',
        field: 'Position'
      }, {
        text: 'Position Type',
        field: 'positionTypeDisplay'
      }, {
        text: 'Link',
        field: 'Link'
      }, {
        text: 'Company',
        flex: 2,
        columns: [{
          text: 'Name',
          field: 'Company.Name'
        }, {
          text: 'Recruitment',
          field: 'Company.IsRecruitment',
          type: ColumnTypes.Boolean,
          formatter: 'boolIcon',
          align: TextAlignments.CENTER,
          width: 100
        }]
      }, {
        text: 'Contacts',
        flex: 2,
        columns: [{
          text: 'Name',
          field: 'Contacts.Name',
          formatter: 'dashIfNull'
        }, {
          text: 'Recruiter',
          field: 'Contacts.IsRecruiter',
          type: ColumnTypes.Boolean,
          align: TextAlignments.CENTER,
          width: 80,
          formatter(value: IFieldValue, record: IApplication) {
            return Formatters.dashIfNull(value, record, 'boolIcon');
          }
        }, {
          text: 'Email',
          field: 'Contacts.Email',
          formatter: 'dashIfNull'
        }]
      }, {
        text: 'Create Date',
        field: 'CreateDate',
        formatter: 'mmddyyyy',
        align: TextAlignments.RIGHT,
        width: 100
      }]
    };
  },

  async created() {
    if (!this.hasChildRoute) {
      await this.loadViewStore();
    }
  },

  methods: {
    async loadViewStore() {
      try {
        await this.viewStore.load({
          url: `${this.viewStore.url}/search`,
          method: 'post',
          params: this.search
        });
      }
      catch (ex) {
        console.exception(ex);
      }
    },
    onClickRefreshButton() {
      this.loadViewStore();
    },
    onClickSearchBtn() {
      this.loadViewStore();
    }
  }
});
</script>

<style scoped
       lang="scss">
</style>
