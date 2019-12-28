select
u.resource
|| jsonb_build_object('id', u.id)
|| jsonb_build_object('verified', case when count(vu.*) > 0 then true else false end)
|| jsonb_build_object('community', (select jsonb_build_object('id', c.id, 'name', c.resource#>>'{name}', 'resourceType', 'Community') from community c where c.id = u.resource#>>'{community,id}' limit 1))
|| jsonb_build_object('communities', (select jsonb_agg(ccc.cl) from (
select jsonb_build_object('id', cc.id, 'name', cc.resource#>>'{name}', 'resourceType', 'Community') cl
from community cc
where cc.id = any(knife_extract_text(u.resource, '[["communities", "id"]]'))
) ccc))
as user
from "userprofile" u
left join verifiedusers vu on vu.resource#>>'{user,id}' = u.id
where u.id = {{params.user}}
group by u.id
