// @flow
import { FF_MAX_CHARS_IN_DESCRIPTION } from 'constants/form-field';
import React from 'react';
import { FormField } from 'component/common/form';
import usePersistedState from 'effects/use-persisted-state';
import Card from 'component/common/card';

type Props = {
  description: ?string,
  disabled: boolean,
  updatePublishForm: ({}) => void,
};

function PublishDescription(props: Props) {
  const { description, updatePublishForm, disabled } = props;
  const [advancedEditor, setAdvancedEditor] = usePersistedState('publish-form-description-mode', false);
  function toggleMarkdown() {
    setAdvancedEditor(!advancedEditor);
  }

  return (
    <Card
      actions={
        <FormField
          type={'textarea'}
          name="content_description"
          label={__('Description')}
          placeholder={__(
            'What is your content about? Use this space to include any other relevant details you may like to share about your content and channel.'
          )}
          value={description}
          disabled={disabled}
          onChange={(value) => updatePublishForm({ description: advancedEditor ? value : value.target.value })}
          quickActionLabel={advancedEditor ? __('Simple Editor') : __('Advanced Editor')}
          quickActionHandler={toggleMarkdown}
          textAreaMaxLength={FF_MAX_CHARS_IN_DESCRIPTION}
        />
      }
    />
  );
}

export default PublishDescription;
