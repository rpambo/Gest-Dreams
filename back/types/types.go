package types

type FormularioDados struct{
	Name       string   `json:"name"`
	Email      string   `json:"email"`
	Telefone   string   `json:"telefone"`
	Empresa    string   `json:"empresa"`
	Cidade     string   `json:"cidade"`
	Setor      string   `json:"setor"`
	Atuacao    string   `json:"atuacao"`
	Porte      string   `json:"porte"`
	Servicos    []string `json:"servicos"`
}

type ComplaintPayload struct {
	Name		string		`json:"name"`
	Email		string		`json:"email"`
	Message		string		`json:"message"`
}