select
u.id,
u.resource as user,
case when count(vu.*) > 0 then true else false end as verified
from "userprofile" u
join verifiedusers vu on vu.resource#>>'{user,id}' = u.id
where u.id = {{params.user}}
group by u.id
