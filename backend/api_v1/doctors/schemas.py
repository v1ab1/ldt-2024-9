import datetime
from pydantic import BaseModel, ConfigDict, field_serializer
from pydantic import BaseModel, ConfigDict, EmailStr
from pydantic_extra_types.phone_numbers import PhoneNumber

from api_v1.doctors.roles import AccountStatus, Role
from api_v1.doctors.skills import Skills
from api_v1.schedule.schemas import ScheduleMixin, ShiftingType, StartHours


# class DoctorBase(BaseModel):
#     full_name: str
#     date_of_birth: datetime.date
#     phone_number: PhoneNumber
#     email: EmailStr
#     position: str
#     specialization: str
#     skills: Skills
#     password: str
#     role: Role
#     account_status: AccountStatus = AccountStatus.UNKOWN

class DoctorPublicInfo(BaseModel):
    full_name: str
    date_of_birth: datetime.date
    position: str
    specialization: str


class DoctorId(BaseModel):
    id: int


class DoctorPublicInfoReturn(DoctorPublicInfo, DoctorId):
    pass


class DoctorConfidentInfo(DoctorPublicInfo, ScheduleMixin):
    phone_number: PhoneNumber
    email: EmailStr
    skills: Skills
    role: Role
    start_hours: StartHours
    shifting_type: ShiftingType
    hours_per_week: int


class DoctorConfidentInfoReturn(DoctorConfidentInfo, DoctorId):
    pass

class DoctorTechnicalInfo(DoctorConfidentInfo):
    password: str
    account_status: AccountStatus = AccountStatus.NEW


class DoctorPartial(DoctorTechnicalInfo):
    full_name: str | None = None
    date_of_birth: datetime.date | None = None
    phone_number: PhoneNumber | None = None
    email: EmailStr | None = None
    position: str | None = None
    specialization: str | None = None
    skills: Skills | None = None
    role: Role | None = None


class Doctor(DoctorTechnicalInfo):
    model_config = ConfigDict(from_attributes=True)
