import React, { memo } from 'react';
import AlertSection from './AlertSection';
import {
  AlertNotification,
  DiscussionNotification,
  UserNotification,
} from '../../types';

interface SectionProps {
  icon: string;
  data?: AlertNotification | DiscussionNotification | UserNotification;
  handleToggle: any;
  disabled: boolean|undefined;
}

const Section: React.FC<SectionProps> = memo(({ icon, data, handleToggle,disabled }) => (
  <div className="flex max-w-[700px] flex-col gap-4 lg:ml-12">
    <div className="flex items-center gap-4">
      {icon && <img src={icon} alt="icon" className="mt-[2px] w-[24px]" />}
      <h2 className="text-start text-xl font-bold">{data?.title}</h2>
    </div>
    {data &&
      Object.entries(data)
        .filter(([key, value]) => key !== 'title')
        .map(([subKey, subSection], index) => (
          <div
            key={index}
            className="flex max-w-[700px] flex-col gap-4 lg:ml-12"
          >
            <div className="w-full">
              <h2 className="text-start text-lg font-semibold">
                {typeof subSection === 'object' && subSection.title}
              </h2>
              <div className="mr-3 flex flex-row justify-end gap-5">
                <span>email</span>
                <span>site</span>
              </div>
            </div>
            {typeof subSection === 'object' &&
              Object.entries(subSection.settings).map(([key, value], index) => (
                <AlertSection
                  key={index}
                  title={(value as { description: string }).description}
                  value={(value as any).value}
                  k1={subKey}
                  k2={key}
                  onChange={handleToggle}
                  disabled={disabled}
                />
              ))}
          </div>
        ))}

    <hr className="my-3 border-y-black" />
  </div>
));
export default Section;
