<template>
  <div class="company-information-page-container">
    <div class="general-information-container element-container">
      <div class="container-title">{{ COMPANY_INFO_STRINGS.GENERAL_INFO_TITLE }}</div>
      <div class="general-info-wrapper">
        <text-input
          :label="COMPANY_INFO_STRINGS.COMPANY_NAME"
          :width="350"
          :disabled="!isAdmin"
          :value="updateCompanyName"
          v-model="updateCompanyName"
        />
        <dropdown
          :title="COMPANY_INFO_STRINGS.INDUSTRY"
          :width="350"
          size="small"
          type="regular"
          :use-search="false"
          :formatter="(item) => item.text"
          :items="INDUSTRY_OPTIONS"
          :selected-items="[updatedIndustry]"
          @dropdown-click="handleIndustryChanged"
        />
      </div>
      <div class="save-button-container">
        <my-button
          style-type="primary"
          :disabled="disableSaveBtn"
          @handle-click="save"
          >{{ COMPANY_INFO_STRINGS.BTN_TEXT }}
        </my-button>
      </div>
    </div>
  </div>
  <div class="product-status-container element-container">
    <div class="container-title">{{ COMPANY_INFO_STRINGS.DOMAINS_TITLE }}</div>
    <div class="table-wrapper">
      <domains-table
        :tabStyling="{ boxStyle: false }"
        :headers="DOMAINS_TABLE_HEADERS"
        :items="domains"
        :row-height="56"
        :itemsPerPage="5"
        with-pagination
        highlight-on-hover
      >
        <template v-slot:[DomainsColumns.DOMAIN]="{ item: modelItem }">
          <span
            v-html="modelItem.domain"
            class="regular-title"
          />
        </template>
        <template v-slot:[DomainsColumns.STATUS]="{ item: modelItem }">
          <status :status="modelItem.status" />
        </template>
        <template v-slot:[DomainsColumns.TIMEZONE]="{ item: modelItem }">
          <span
            v-html="modelItem.timeZone"
            class="body-small"
          />
        </template>
        <template v-slot:[DomainsColumns.CURRENCY]="{ item: modelItem }">
          <span
            v-html="modelItem.currency"
            class="body-small"
          />
        </template>
      </domains-table>
    </div>

    <div class="contact-support">
      <span class="body-small">{{ COMPANY_INFO_STRINGS.ADD_DOMAINS }}</span>
      <my-button
        text-padding="0"
        style-type="textLink"
        @handle-click="contactSupportClicked"
      >
        <span class="body-small-bold">{{ COMPANY_INFO_STRINGS.CONTACT_SUPPORT }}</span>
      </my-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import MyButton from '@/design-library/src/components/Button/Button.vue';
  import { computed, ref } from 'vue';
  import type { PropType } from 'vue';
  import {
    COMPANY_INFO_STRINGS,
    DOMAINS_LIST_EXAMPLE,
    DOMAINS_TABLE_HEADERS,
    INDUSTRY_OPTIONS,
  } from '@/components/Settings/CompanyInformation/consts';
  import { DomainsColumns } from '@/components/Settings/CompanyInformation/types';
  import type { IDomainItem } from '@/components/Settings/CompanyInformation/types';
  import Dropdown from '@/design-library/src/components/Dropdown/Dropdown.vue';
  import TextInput from '@/design-library/src/components/TextInput/TextInput.vue';
  import DomainsTable from '@/design-library/src/components/Table/Table.vue';
  import Status from '@/components/Common/Status/Status.vue';
  import type { IDropdownItem } from '@/design-library/src/types/interfaces/IDropdownItem';

  defineOptions({
    name: 'CompanyInformationPage',
  });

  const props = defineProps({
    domainsList: {
      type: Array as PropType<IDomainItem[]>,
      default: () => DOMAINS_LIST_EXAMPLE,
    },
    companyName: {
      type: String,
      default: 'SOME NAME HERE',
    },
    industry: {
      type: Number, // TODO: change to actual type when reading from server
      default: 1,
    },
  });

  const isAdmin = computed(() => true);

  // read from store or get as prop;
  const domains = ref(props.domainsList);
  const updateCompanyName = ref(props.companyName);
  const updatedIndustry = ref({ value: props.industry, text: '1' });

  const disableSaveBtn = computed(() => {
    const res = props.companyName === updateCompanyName.value && props.industry === updatedIndustry.value.value;
    return res;
  });

  const handleIndustryChanged = (data: IDropdownItem) => {
    updatedIndustry.value = data;
  };

  const contactSupportClicked = () => {
    //TODO: compose email
    console.log('contactSupportClicked');
  };

  const save = () => {
    // TODO: handle save
    console.log('save');
  };
</script>

<style lang="scss" scoped>
  .general-info-wrapper {
    display: flex;
    gap: 24px;
  }

  .company-information-page-container {
    padding-top: 56px;
    width: 100%;

    .general-information-container {
      display: flex;
      flex-direction: column;
      gap: 24px;
      width: 100% !important;
      margin-bottom: 24px;
    }

    .save-button-container {
      display: flex;
      justify-content: flex-end;
    }
  }

  .product-status-container {
    width: 100%;
    flex-direction: column;
    gap: 24px;
    display: flex;

    .contact-support {
      display: flex;
      gap: 4px;
      align-items: center;
    }
  }
</style>
