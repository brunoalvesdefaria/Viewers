import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ButtonGroup from '../../../components/ButtonGroup';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';

const YunuTimepointBrowser = ({
  timepoints,
  activeTabName,
  activeTimepointId,
  onClickTab,
  onClickTimepoint,
  children,
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
          const isExpanded = timepoint.id === activeTimepointId;
          return (
            <>
              <div
                key={timepoint.id}
                className="flex flex-row items-center bg-blue-700 text-white px-2 h-8 justify-between border-black border-t cursor-pointer"
                onClick={() => onClickTimepoint(timepoint.id)}
              >
                <Icon
                  name="chevron-right"
                  className={isExpanded ? 'rotate-90' : ''}
                />
                <div className="font-bold text-[14px] ml-1">
                  {timepoint.label}
                </div>
                <div className="flex flex-row gap-x-1 text-[9px] text-blue-300 ml-2">
                  {timepoint.keys.map(key => (
                    <span
                      key={key}
                      className="uppercase border border-blue-300 rounded-[3px] px-1"
                    >
                      {key}
                    </span>
                  ))}
                </div>
                <div className="text-blue-400 text-[13px] grow text-right">
                  {timepoint.date}
                </div>
              </div>
              {isExpanded && (
                <div className="bg-black text-white">{children}</div>
              )}
            </>
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <div
        className="flex flex-row items-center justify-center h-16 p-4 border-b w-100 border-secondary-light bg-primary-dark"
        data-cy={'yunuTimepointBrowser-panel'}
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
            bgColor={activeTabName !== 'key' ? 'bg-primary-main' : 'bg-black'}
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

YunuTimepointBrowser.propTypes = {
  activeTabName: PropTypes.string.isRequired,
  activeTimepointId: PropTypes.string,
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
  children: PropTypes.node,
};

const noop = () => {};

YunuTimepointBrowser.defaultProps = {
  onClickTab: noop,
  onClickTimepoint: noop,
  timepoints: [],
};

export default YunuTimepointBrowser;
