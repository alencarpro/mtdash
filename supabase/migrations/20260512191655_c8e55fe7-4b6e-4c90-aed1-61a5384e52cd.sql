-- Atualizar o papel para admin (em minúsculo conforme definido no enum 'app_role')
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = 'e2b4f73b-b40b-4c70-a0cb-4764812d2b40';

-- Caso não exista o registro, inserir
INSERT INTO public.user_roles (user_id, role)
SELECT 'e2b4f73b-b40b-4c70-a0cb-4764812d2b40', 'admin'
WHERE NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = 'e2b4f73b-b40b-4c70-a0cb-4764812d2b40'
);