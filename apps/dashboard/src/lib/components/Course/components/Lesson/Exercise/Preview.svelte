<script>
  import RadioQuestion from '$lib/components/Question/RadioQuestion/index.svelte';
  import CheckboxQuestion from '$lib/components/Question/CheckboxQuestion/index.svelte';
  import TextareaQuestion from '$lib/components/Question/TextareaQuestion/index.svelte';
  import { QUESTION_TYPE } from '$lib/components/Question/constants';
  import { getPropsForQuestion } from './functions';
  import { course } from '$lib/components/Course/store';
  import { COURSE_TYPE } from '$lib/utils/types';

  export let questions = [];
  export let questionnaireMetaData = {};
  export let grades = {};
  export let onSubmit = () => {};
  export let onPrevious = () => {};
  export let handleGrade = () => {};
  export let disableGrading = true;
  export let isGradeWithAI = false;
  export let isLoading = false;
  export let reasons = {};
</script>

{#each questions as currentQuestion, currentQuestionIndex}
  {#if QUESTION_TYPE.RADIO === currentQuestion.question_type.id}
    <RadioQuestion
      {...getPropsForQuestion(
        questions,
        currentQuestion,
        questionnaireMetaData,
        currentQuestionIndex + 1,
        onSubmit,
        onPrevious,
        true
      )}
      bind:grade={grades[currentQuestion.id]}
      bind:isGradeWithAI
      bind:reason={reasons[currentQuestion.id]}
      bind:isLoading
      gradeMax={currentQuestion.points}
      handleGrade={handleGrade(currentQuestion.id)}
      {disableGrading}
      disabled={true}
      hideGrading={$course.type === COURSE_TYPE.SELF_PACED}
    />
  {:else if QUESTION_TYPE.CHECKBOX === currentQuestion.question_type.id}
    <CheckboxQuestion
      {...getPropsForQuestion(
        questions,
        currentQuestion,
        questionnaireMetaData,
        currentQuestionIndex + 1,
        onSubmit,
        onPrevious,
        true
      )}
      bind:grade={grades[currentQuestion.id]}
      bind:isGradeWithAI
      bind:reason={reasons[currentQuestion.id]}
      bind:isLoading
      gradeMax={currentQuestion.points}
      handleGrade={handleGrade(currentQuestion.id)}
      {disableGrading}
      disabled={true}
      hideGrading={$course.type === COURSE_TYPE.SELF_PACED}
    />
  {:else if QUESTION_TYPE.TEXTAREA === currentQuestion.question_type.id}
    <TextareaQuestion
      {...getPropsForQuestion(
        questions,
        currentQuestion,
        questionnaireMetaData,
        currentQuestionIndex + 1,
        onSubmit,
        onPrevious,
        true
      )}
      bind:grade={grades[currentQuestion.id]}
      bind:isGradeWithAI
      bind:reason={reasons[currentQuestion.id]}
      bind:isLoading
      gradeMax={currentQuestion.points}
      handleGrade={handleGrade(currentQuestion.id)}
      {disableGrading}
      disabled={true}
      hideGrading={$course.type === COURSE_TYPE.SELF_PACED}
    />
  {/if}
{/each}
