import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ButtonGroup from '../../../components/ButtonGroup';
import Button from '../../../components/Button';

const StudyBrowser = ({
  timepoints,
  activeTabName,
  onClickTab,
  onClickTimepoint,
}) => {
  const { t } = useTranslation('Yunu');

  const getTabContent = activeTabName => {
    let items = timepoints;
    if (activeTabName === 'key') {
      items = timepoints.filter(timepoint => timepoint.keys.length > 0);
    }

    return (
      <React.Fragment key={activeTabName}>
        {items.map(timepoint => {
          return (
            <div
              className="flex flex-row bg-blue-700 text-white px-3 py-1 gap-x-2 justify-between border-black border-t"
              key={timepoint.id}
            >
              <div className="font-bold">{timepoint.label}</div>
              <div>{timepoint.keys.join('|')}</div>
              <div>{timepoint.date}</div>
            </div>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div
        className="flex flex-row items-center justify-center h-16 p-4 border-b w-100 border-secondary-light bg-primary-dark"
        data-cy={'studyBrowser-panel'}
      >
        <ButtonGroup variant="outlined" color="secondary" splitBorder={false}>
          <Button
            className={'text-white text-base p-2 min-w-18'}
            size="initial"
            bgColor={activeTabName === 'key' ? 'bg-primary-main' : 'bg-black'}
            onClick={() => {
              onClickTab('key');
            }}
          >
            {t('timepoint.key')}
          </Button>
          <Button
            className={'text-white text-base p-2 min-w-18'}
            size="initial"
            bgColor={activeTabName === 'all' ? 'bg-primary-main' : 'bg-black'}
            onClick={() => {
              onClickTab('all');
            }}
          >
            {t('timepoint.all')}
          </Button>
        </ButtonGroup>
      </div>
      <div className="flex flex-col flex-1 overflow-auto ohif-scrollbar invisible-scrollbar">
        {getTabContent(activeTabName)}
      </div>
    </React.Fragment>
  );
};

StudyBrowser.propTypes = {
  activeTabName: PropTypes.string.isRequired,
  onClickTab: PropTypes.func.isRequired,
  onClickTimepoint: PropTypes.func.isRequired,
  timepoints: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      date: PropTypes.string,
      keys: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};

const noop = () => {};

StudyBrowser.defaultProps = {
  onClickTab: noop,
  onClickTimepoint: noop,
  timepoints: [],
};

export default StudyBrowser;
