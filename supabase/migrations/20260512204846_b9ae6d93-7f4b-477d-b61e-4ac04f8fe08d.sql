-- Desativar o trigger temporariamente
ALTER TABLE public.profiles DISABLE TRIGGER profiles_prevent_escalation;

-- Atualizar o papel do usuário
UPDATE public.profiles 
SET role = 'ADMIN' 
WHERE id = 'e2b4f73b-b40b-4c70-a0cb-4764812d2b40';

-- Reativar o trigger
ALTER TABLE public.profiles ENABLE TRIGGER profiles_prevent_escalation;