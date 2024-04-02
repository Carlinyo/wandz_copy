import KpiBoxComp, { KpiBoxUpliftContent } from '../../src/components/KpiBox';
import icon from '../../src/assets/icons/actions/edit.svg';

export default {
  title: 'Kpi Box',
  component: KpiBoxComp,
  subcomponents: { KpiBoxUpliftContent },
  argTypes: {
    boxClick: {
      action: 'boxClick',
      description: 'Event triggered on clicking the container box',
    },
    ctaClick: {
      action: 'ctaClick',
      description: 'Event triggered on clicking bottom-left cta button',
    },
    title: {
      control: { type: 'text' },
      name: 'KPI Title',
      description: 'Box Title',
      defaultValue: 'Best Kpi Title',
    },
    titleStyle: {
      control: { type: 'object' },
      name: 'titleStyle',
      description: 'Custom title style object',
      defaultValue: {},
    },
    titleInfo: {
      control: { type: 'text' },
      name: 'titleInfo',
      description: 'Box Title icon on hover text',
      defaultValue: 'the most informative text 🥸',
    },
    ctaText: {
      control: { type: 'text' },
      name: 'ctaText',
      description: 'Text to show for cta (bottom-left), not providing ctaText means no cta button link at bottom',
      defaultValue: 'Click me bruh',
    },
    ctaArrow: {
      control: { type: 'boolean' },
      name: 'ctaArrow',
      description: 'Should show cta purple arrow',
      defaultValue: false,
    },
    shadow: {
      control: { type: 'boolean' },
      name: 'shadow',
      description: 'Should appear with shadow and border',
      defaultValue: true,
    },
    loading: {
      control: { type: 'boolean' },
      name: 'loading',
      description: 'Will show yellow loading bar on the top of the box',
      defaultValue: false,
    },
    mainValueText: {
      control: { type: 'text' },
      name: 'mainValueText',
      description: 'Main Value Text',
      defaultValue: '32%',
    },
    mainValueColor: {
      control: { type: 'color' },
      name: 'mainValueColor',
      description: 'Main Value Color',
      defaultValue: '',
    },
    mainValueAdditionalText: {
      control: { type: 'text' },
      name: 'mainValueAdditionalText',
      description: 'Main Additional Value Text',
      defaultValue: '(12%)',
    },
    upliftText: {
      control: { type: 'text' },
      name: 'upliftText',
      description: 'Green uplift Text',
      defaultValue: '+21.02',
    },
    upliftTextNegativeColor: {
      control: { type: 'boolean' },
      name: 'upliftTextNegativeColor',
      description: 'Should show red uplift text instead of green',
      defaultValue: false,
    },
    upliftAdditionalText: {
      control: { type: 'text' },
      name: 'upliftAdditionalText',
      description: 'Text to the right of Green uplift Text',
      defaultValue: 'vs control',
    },
    upliftBackgroundColor: {
      control: { type: 'color' },
      name: 'upliftBackgroundColor',
      description: 'Uplift background color',
      defaultValue: 'transparent',
    },
    details: {
      control: { type: 'array' },
      name: 'details',
      description: "Details Rows Array example: ```[ { text: '', value: '', info: '' }, ...]```  ",
      defaultValue: [],
    },
    upliftArrowDirectionDown: {
      control: { type: 'boolean' },
      name: 'upliftArrowDirectionDown',
      description: 'Should point uplift arrow downwards',
      defaultValue: false,
    },
    upliftArrowNegativeColor: {
      control: { type: 'boolean' },
      name: 'upliftArrowNegativeColor',
      description: 'Should show red arrow instead of green',
      defaultValue: false,
    },
    upliftTooltipContent: {
      control: { type: 'text' },
      name: 'upliftTooltipContent',
      description: 'add uplift tooltip',
      defaultValue: 'this is uplift tooltip',
    },
    iconSrc: {
      control: { type: 'file' },
      name: 'iconSrc',
      description: 'Icon :src',
      defaultValue: icon,
    },
    ctaButtonIconSrc: {
      control: { type: 'file' },
      name: 'ctaButtonIconSrc',
      description: 'Cta Button Icon :src',
    },
    bottomRowClass: {
      control: { type: 'select' },
      name: 'bottomRowClass',
      description: 'Bottom row class',
      defaultValue: '',
      options: ['', 'tw-justify-between', 'tw-justify-end', 'tw-justify-start', 'tw-justify-center'],
    },
    topIconSrc: {
      control: { type: 'file' },
      name: 'topIconSrc',
      description: 'Top Icon :src',
    },
    containerStyle: {
      control: { type: 'object' },
      name: 'containerStyle',
      description: 'Custom kpi box container style object',
      defaultValue: {},
    },
    diagonalStripe: {
      control: { type: 'object' },
      name: 'diagonalStripe',
      description: 'Should show diagonal stripe',
      defaultValue: {
        text: '',
        textColor: 'yellow',
        stripeColor: 'black',
      },
    },
    stripe: {
      control: { type: 'boolean' },
      name: 'stripe',
      description: 'Should show bottom stripe',
      defaultValue: false,
    },
    fatStripe: {
      control: { type: 'boolean' },
      name: 'fatStripe',
      description: 'Should show fatter bottom stripe',
      defaultValue: false,
    },
    stripeColor: {
      control: { type: 'color' },
      name: 'stripeColor',
      description: 'stripe color',
      defaultValue: '#ce6eff',
    },
    clickable: {
      control: { type: 'boolean' },
      name: 'clickable',
      description: 'Is entire box clickable',
      defaultValue: false,
    },
    tagText: {
      control: { type: 'text' },
      name: 'tagText',
      description: 'Tag text',
    },
    tagBackgroundColor: {
      control: { type: 'text' },
      name: 'tagBackgroundColor',
      description: 'TagBackgroundColor',
    },
  },
  args: {
    title: 'Best Kpi Title',
    titleInfo: 'the most informative text 🥸',
    ctaText: 'Click me bruh',
    ctaArrow: false,
    shadow: true,
    loading: false,
    mainValueText: '32%',
    mainValueColor: '',
    mainValueAdditionalText: '(12%)',
    upliftText: '+21.02',
    upliftTextNegativeColor: false,
    upliftAdditionalText: 'vs control',
    upliftBackgroundColor: 'transparent',
    details: [],
    upliftArrowDirectionDown: false,
    upliftArrowNegativeColor: false,
    upliftTooltipContent: 'this is uplift tooltip',
    // iconSrc: icon,
    ctaButtonIconSrc: '',
    bottomRowClass: '',
    topIconSrc: '',
    containerStyle: {},
    diagonalStripe: {
      text: '',
      textColor: 'yellow',
      stripeColor: 'black',
    },
    stripe: false,
    fatStripe: false,
    stripeColor: '#ce6eff',
    clickable: false,
    tagText: '',
    tagBackgroundColor: '',
  },
};

export const DefaultKpiBox = (args, { argTypes }) => ({
  components: { KpiBox: KpiBoxComp, KpiBoxUpliftContent },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-flex tw-justify-center tw-w-72">
    <KpiBox
      :title="title"
      :titleInfo="titleInfo"
      :iconSrc="iconSrc"
      :topIconSrc="topIconSrc"
      :diagonal-stripe="diagonalStripe"
      :stripe="stripe"
      :clickable="clickable"
      :ctaText="ctaText"
      :fatStripe="fatStripe"
      :shadow="shadow"
      :loading="loading"
      :stripeColor="stripeColor"
      :ctaArrow="ctaArrow"
      :locked="locked"
      :bottom-row-class="bottomRowClass"
      :cta-button-icon="ctaButtonIconSrc"
      :container-style="containerStyle"
      @ctaClick="ctaClick"
      @boxClick="boxClick"
    >
      <KpiBoxUpliftContent
        :mainValueText="mainValueText"
        :mainValueColor="mainValueColor"
        :mainValueAdditionalText="mainValueAdditionalText"
        :upliftText="upliftText"
        :upliftTextNegativeColor="upliftTextNegativeColor"
        :upliftAdditionalText="upliftAdditionalText"
        :upliftBackgroundColor="upliftBackgroundColor"
        :upliftArrowDirectionUp="upliftArrowDirectionDown"
        :upliftArrowNegativeColor="upliftArrowNegativeColor"
        :upliftTooltipContent="upliftTooltipContent"
        :tagText="tagText"
        :tagBackgroundColor="tagBackgroundColor"
        :details="details"
      />
    </KpiBox>
    </div>
    `,
});

export const DefaultKpiBoxCustomUpliftRow = (args) => ({
  components: { KpiBox: KpiBoxComp, KpiBoxUpliftContent },
  props: Object.keys(args),
  template: `
    <KpiBox
      :title="title"
      :titleInfo="titleInfo"
      :iconSrc="iconSrc"
      :stripe="stripe"
      :clickable="clickable"
      :ctaText="ctaText"
      :fatStripe="fatStripe"
      :stripeColor="stripeColor"
      :ctaArrow="ctaArrow"
      :loading="loading"
      @ctaClick="ctaClick"
      @boxClick="boxClick"
    >
      <KpiBoxUpliftContent
        :mainValueText="mainValueText"
        :mainValueColor="mainValueColor"
        :mainValueAdditionalText="mainValueAdditionalText"
        :upliftText="upliftText"
        :upliftAdditionalText="upliftAdditionalText"
        :upliftArrowDirectionDown="upliftArrowDirectionDown"
        :upliftArrowNegativeColor="upliftArrowNegativeColor"
        :upliftTooltipContent="upliftTooltipContent"
        :details="details"
      >
      <template #uplift-row>custom row here yo</template>
      </KpiBoxUpliftContent>
    </KpiBox>
    `,
});

export const LongTitleKpiBox = DefaultKpiBox.bind({});
LongTitleKpiBox.args = {
  ...DefaultKpiBox.args,
  title:
    'this title goes on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on and on',
};

export const KpiBoxWithDetails = DefaultKpiBox.bind({});
KpiBoxWithDetails.args = {
  ...DefaultKpiBox.args,
  details: [
    { text: 'Phone collected:', value: '8,383', info: 'some phone info 📱' },
    { text: 'Email collected:', value: '18,383', info: 'some email info 📫' },
  ],
};

export const KpiBoxWithStripe = DefaultKpiBox.bind({});
KpiBoxWithStripe.args = {
  ...DefaultKpiBox.args,
  iconSrc: '',
  stripe: true,
};

export const KpiBoxClickable = DefaultKpiBox.bind({});
KpiBoxClickable.args = {
  ...DefaultKpiBox.args,
  ctaText: '',
  clickable: true,
};
