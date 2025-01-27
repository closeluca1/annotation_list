# Todo List Application

#### 26/01/2025 - Projeto em desenvolvimento

Este é um projeto de Todo List implementado com ReactJS, TypeScript, Ant Design (AntD), Lucide React e TailwindCSS. A aplicação permite que os usuários criem, editem e visualizem todos, adicionem lembretes, marquem tarefas como concluídas, e visualizem as tarefas organizadas por data.

## Funcionalidades

- Cadastro e gerenciamento de todos: Crie novos todos com título, descrição, prioridade e grupo relacionado.
- Lembretes: Crie lembretes associados a grupos e salve-os.
- Visualização por Data: Visualize seus todos em um calendário, onde cada dia mostra o número de tarefas.
- Status de Tarefa: Marque tarefas como concluídas e visualize a data de conclusão.
- Armazenamento Local: Todos os dados são armazenados localmente no navegador com `localStorage`, permitindo persistência mesmo após recarregar a página.

## o que falta adicionar

- Página inicial.
- Sistema de grupo e relacionados.
- Área dinâmica para os lembretes.
- Filtragem por busca.

## Tecnologias Utilizadas

- ReactJS - Biblioteca para a construção da interface do usuário.
- TypeScript - Superset do JavaScript que adiciona tipagem estática.
- Ant Design (AntD) - Biblioteca de componentes UI, utilizada para elementos como botões, inputs e badges.
- Lucide React - Ícones leves e personalizáveis para a interface.
- TailwindCSS - Framework CSS utilitário para estilização rápida e flexível.

#

# Bugs

- No _Checkbox_ em `web/src/shared/compoents/todayTodoList` o valor de _onPointerDown_ apresenta um erro de tipagem;

- Os _inputs_ de Data não estão no formato DD/MM/AAAA;

- Ao criar ou editar uma tarefa os dados da lista retorna todas as tarefas já criadas;

