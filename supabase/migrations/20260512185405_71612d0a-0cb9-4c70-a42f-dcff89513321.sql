-- Limpando roles existentes para evitar duplicidade
DELETE FROM public.user_roles WHERE user_id IN ('e2b4f73b-b40b-4c70-a0cb-4764812d2b40', '30235b3c-5926-4e86-b95b-a1c09496c769');

-- Inserindo os novos papéis (usando letras minúsculas conforme o enum 'app_role')
INSERT INTO public.user_roles (user_id, role) VALUES 
('e2b4f73b-b40b-4c70-a0cb-4764812d2b40', 'admin'),
('30235b3c-5926-4e86-b95b-a1c09496c769', 'viewer');

-- Atualizando ou inserindo perfis para garantir que os nomes apareçam no sistema
INSERT INTO public.profiles (id, full_name, active) VALUES 
('e2b4f73b-b40b-4c70-a0cb-4764812d2b40', 'Angelton', true),
('30235b3c-5926-4e86-b95b-a1c09496c769', 'Inteligência CGE', true)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name, active = EXCLUDED.active;