
import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict


# class WorkStatus(str, Enum):
#     WORKING = 'working'
#     # работает
#     BREAK = 'break'
#     # отдых
#     HOME = 'home'
#     # закончилось рабочее время
#     VACATION = 'vacation'
#     # в отпуске
#     FORCE_MAJEURE = 'force_majeure'
#     # форс мажор, не может работать


# def parse_work_status(status: str):
#     status = status.upper().strip()
#     return WorkStatus[status]


class Interval(BaseModel):
    start_time: datetime.time
    end_time: datetime.time
    is_break: bool


class DaySchedule(BaseModel):
    intervals: list[Interval]
    date: datetime.date
    total_break_time: datetime.timedelta
    total_working_time: datetime.timedelta


class Schedule(BaseModel):
    schedule: list[DaySchedule]

class WorkStatus(str, Enum):
    WORKING = 'working' 
    HOME = 'home'
    VACATION = 'vacation'
    FORCE_MAJEURE = 'force_majeure'
    OVERTIME = 'overtime'

class ShiftingType(str, Enum):
    FIVE_TWO = '5/2'
    TWO_TWO = '2/2'

class StartHours(str, Enum):
    EIGHT = '08:00'
    NINE = '09:00'
    TWO_PM = '14:00'
    EIGHT_PM = '20:00'

class HoursPerWeek(Enum):
    TWENTY = 20
    THIRTY = 30
    FOURTY = 40

class ScheduleMixin(BaseModel):
    start_hours: StartHours
    shifting_type: ShiftingType
    hours_per_week: HoursPerWeek

class ScheduleEvent(BaseModel):
    doctor_id: int
    date: datetime.date
    work_status: WorkStatus