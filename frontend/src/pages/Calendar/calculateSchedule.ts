// @ts-nocheck

export const generateDoctorScheduleForMonth = (year: number, month: number): Event[] => {
    const getDaysInMonth = (year: number, month: number): number => new Date(year, month + 1, 0).getDate();
  
    const events: Event[] = [];
  
    const previousMonthDays = (year: number, month: number): Date[] => {
      const days: Date[] = [];
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      if (firstDayOfMonth !== 1) { // Если не понедельник
        const previousMonthLastDate = new Date(year, month, 0).getDate();
        let startDay = previousMonthLastDate - (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 2);
        for (let day = startDay; day <= previousMonthLastDate; day++) {
          days.push(new Date(year, month - 1, day));
        }
      }
      return days;
    };
  
    const nextMonthDays = (year: number, month: number): Date[] => {
      const days: Date[] = [];
      const lastDayOfMonth = new Date(year, month + 1, 0).getDay();
      if (lastDayOfMonth !== 5) { // Если не пятница
        let day = 1;
        for (let i = lastDayOfMonth; i < 5; i++) {
          days.push(new Date(year, month + 1, day++));
        }
      }
      return days;
    };
  
    const addShift = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const startOfDay = new Date(year, month, day, 8, 0, 0);
      const endOfDay = new Date(year, month, day, 17, 0, 0);
  
      const lunchStartHour = 12 + Math.floor(Math.random() * 3);
      const lunchStart = new Date(year, month, day, lunchStartHour, 0, 0);
      const lunchEnd = new Date(lunchStart);
      lunchEnd.setHours(lunchStart.getHours() + 1);
  
      const morningShift: Event = {
        title: `${startOfDay.getHours()}:00 - ${lunchStart.getHours()}:00`,
        start: startOfDay,
        end: lunchStart,
      };
  
      const afternoonShift: Event = {
        title: `${lunchEnd.getHours()}:00 - ${endOfDay.getHours()}:00`,
        start: lunchEnd,
        end: endOfDay,
      };
  
      events.push(morningShift, afternoonShift);
    };
  
    const daysInMonth = getDaysInMonth(year, month);
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayOfWeek = currentDate.getDay();
  
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Исключить выходные
        addShift(currentDate);
      }
    }
  
    previousMonthDays(year, month).forEach(date => {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        addShift(date);
      }
    });
  
    nextMonthDays(year, month).forEach(date => {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        addShift(date);
      }
    });
  
    return events;
  }