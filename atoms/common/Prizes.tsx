import React from 'react';

const initialPrizes = {
  first: '$20,000',
  second: '$10,000',
  third: '$8,000',
  fourth: '$7,000',
  fifthToSeventh: '$5,000',
};

const Prizes: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4">
      <h3 className="text-xl font-bold">Prizes</h3>
      <ul className="list-disc pl-5 text-gray-600">
        <li>1st place: {initialPrizes.first}</li>
        <li>2nd place: {initialPrizes.second}</li>
        <li>3rd place: {initialPrizes.third}</li>
        <li>4th place: {initialPrizes.fourth}</li>
        <li>5th - 7th places: {initialPrizes.fifthToSeventh}</li>
      </ul>
      <h4 className="font-semibold">Leaderboard Prizes</h4>
      <ul className="list-disc pl-5 text-gray-600">
        <li>1st place: {initialPrizes.first}</li>
        <li>2nd place: {initialPrizes.second}</li>
        <li>3rd place: {initialPrizes.third}</li>
        <li>4th place: {initialPrizes.fourth}</li>
        <li>5th - 7th places: {initialPrizes.fifthToSeventh}</li>
      </ul>
      <h4 className="font-semibold">Efficiency Prizes</h4>
    </div>
  );
};

export default Prizes;
