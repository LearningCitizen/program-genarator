export const DATE_FORMAT_FR = 'dd/MM/yyyy';
export const RANGE_DATE_FORM_GROUP = 'rangeDate';
export const START_FORM_CONTROL = 'start';
export const END_FORM_CONTROL = 'end';
export const PARTICIPANTS_FORM_CONTROL = 'participants';
export const SELECTED_DAYS_FORM_CONTROL = 'selectedDays';
export const ROLES_NUMBER_FORM_CONTROL = 'rolesNumber';
export const INITIAL_FORM = 'initial';
export const AVAILABILITY_FORM = 'availability';

export type InputProgramGenerator =  {
    participants: string[],
    pgmDates: Date[],
    roles: number[],
    unavailabilitiy: string[][][],
};
