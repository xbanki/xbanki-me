<!--
 // Button Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

 <template>

    <!-- Component root. //-->
    <button>

      <!-- Button content slot. //-->
      <slot/>
    </button>
 </template>

 <script lang="ts" setup>
import { useTemplateRef } from 'vue';

import type { ButtonProps } from '@/button/lib/types.ts';
import { DEFAULT_BUTTON_PROPS_OPTIONAL } from '@/button/lib/constants.ts';

const props = withDefaults(
    defineProps<ButtonProps>(),
    DEFAULT_BUTTON_PROPS_OPTIONAL,
);
const id = (Math.random() + 1).toString(36).substring(7);
const element = useTemplateRef<HTMLButtonElement>(id);
</script>
