<script>
  import pluralize from 'pluralize';
  import { ImageLoader } from 'carbon-components-svelte';
  import OverflowMenuHorizontalIcon from 'carbon-icons-svelte/lib/OverflowMenuHorizontal.svelte';
  import { currentOrgPath } from '$lib/utils/store/org';
  import Dropdown from '$lib/components/Dropdown/index.svelte';
  import PrimaryButton from '$lib/components/PrimaryButton/index.svelte';
  import { VARIANTS } from '$lib/components/PrimaryButton/constants';
  import { onRename, onDelete } from '$lib/utils/services/org/quiz';
  import { themeImages } from '$lib/utils/constants/quiz';
  import { calDateDiff } from '$lib/utils/functions/date';
  import { t } from '$lib/utils/functions/translations';

  export let quiz;
  export let totalQuestions;

  function getOptions() {
    return [
      // {
      //   label: 'Edit',
      //   onClick: onEdit(quiz),
      // },
      // {
      //   label: 'Share',
      //   onClick: onShare(quiz),
      // },
      // {
      //   label: 'Report',
      //   onClick: onReport(quiz),
      // },
      {
        label: $t('components.quiz.rename'),
        onClick() {
          onRename(quiz);
        }
      },
      // {
      //   label: 'Make a copy',
      //   onClick() {
      //     onMakeCopy(quiz);
      //   },
      // },
      {
        label: $t('components.quiz.delete'),
        onClick() {
          onDelete(quiz);
        }
      }
    ];
  }

  function startQuiz() {}
</script>

{#if quiz}
  <div
    class="root w-full border hover:shadow-2xl transition ease-in-out rounded-lg bg-gray-100 dark:bg-black mb-5 relative flex flex-col lg:flex-row p-3"
  >
    <ImageLoader
      src={themeImages[quiz.theme]?.card || themeImages.standard.card}
      alt="quiz-card"
      style="max-width:300px, min-width: 200px;"
    />

    <div class="p-2 md:p-5 flex flex-col justify-between w-full">
      <div class="flex justify-between">
        <h4 class="dark:text-white title text-md font-bold capitalize">
          <a href="{$currentOrgPath}/quiz/{quiz.id}">{quiz.title}</a>
        </h4>

        <Dropdown options={getOptions()} classNames="absolute top-4 right-4" isIcon={true}>
          <div class="p-1 rounded-full bg-gray-200 dark:bg-gray-600">
            <OverflowMenuHorizontalIcon size={20} class="carbon-icon active" />
          </div>
        </Dropdown>
      </div>

      <div class="flex md:flex-row flex-col justify-between">
        <div>
          <p class="mb-2">{pluralize('question', totalQuestions, true)}</p>
          <p class="mb-2 md:mb-0">{$t('components.quiz.updated')} {calDateDiff(quiz.updated_at)}</p>
        </div>

        <PrimaryButton
          className="px-6 py-3"
          variant={VARIANTS.OUTLINED}
          label={$t('components.quiz.start')}
          onClick={startQuiz}
        />
      </div>
    </div>
  </div>
{/if}

<style>
  .root {
    min-height: 180px;
  }
</style>
