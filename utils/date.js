export const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();
  const time = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).slice(0, -3);;
return {day, month, year, time}
};

export function translateMonthNameToUkrainian(monthName) {
    const monthMap = {
      January: 'cічня',
      February: 'лютого',
      March: 'березня',
      April: 'квітня',
      May: 'травня',
      June: 'червня',
      July: 'липня',
      August: 'серпня',
      September: 'вересня',
      October: 'жовтня',
      November: 'листопада',
      December: 'грудня',
    };
  
    return monthMap[monthName] || monthName;
  }
  