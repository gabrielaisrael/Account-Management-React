import { formatCurrentMonth } from '../../helpers/dateFilter';
import { ResumeItem } from '../ResumeItem';
import * as C from './styled';

import { FaArrowAltCircleRight } from "@react-icons/all-files/fa/FaArrowAltCircleRight";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

type Props = {
    currentMonth: string;
    onChangeMonth: (newMonth: string) => void;
    income: number;
    expense: number;
}

export const InfoArea = ({ currentMonth, onChangeMonth, income, expense }: Props) => {

    const theme = useContext(ThemeContext);

    const handlePrevMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() - 1);
        onChangeMonth(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    const handleNextMonth = () => {
        let [year, month] = currentMonth.split('-');
        let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1);
        currentDate.setMonth(currentDate.getMonth() + 1);
        onChangeMonth(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }

    return (
        <C.Container>
            <C.ResumeArea>
            <ResumeItem tipTitle='סה"כ' title='סה"כ' value={parseFloat((income - expense).toFixed(2))} color={(income - expense) < 0 ? '#dc3545' : '#28a745'} />
                <ResumeItem tipTitle='סה"כ הוצאות' title="הוצאות" value={parseFloat(expense.toFixed(2))} />
                <ResumeItem tipTitle='סה"כ הכנסות' title="הכנסות" value={parseFloat(income.toFixed(2))} />

            </C.ResumeArea>
            <C.MonthArea>
            <C.MonthArrow
                    onClick={handleNextMonth}
                    data-tip="חודש הבא"
                    data-for="tip-top"
                >
                    <FaArrowAltCircleLeft
                        color={theme.background.secundary}
                    />
                </C.MonthArrow>
                <C.MonthTitle>{formatCurrentMonth(currentMonth)}</C.MonthTitle>
                <C.MonthArrow
                    onClick={handlePrevMonth}
                    data-tip="חודש קודם"
                    data-for="tip-top"
                >
                                      <FaArrowAltCircleRight
                        color={theme.background.secundary}
                    />
                </C.MonthArrow>
            </C.MonthArea>
        </C.Container>
    )
}