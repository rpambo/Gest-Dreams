package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/rpambo/web-site-onda-branca/internal/mailer"
	"github.com/rpambo/web-site-onda-branca/types"
)

// SendEmailEnterprises godoc
// @Summary     Envia email de confirmação e notificação
// @Description Recebe dados de uma empresa, envia um email de boas-vindas ao cliente e uma notificação para a equipa de vendas
// @Tags        enterprises
// @Accept      json
// @Produce     json
// @Param       payload body types.FormularioDados true "Enterprise Info"
// @Success     200 {object} types.FormularioDados
// @Failure     400 {object} map[string]string
// @Failure     500 {object} map[string]string
// @Router      /v1/enterprises/email [post]
func (app *application) SendEmailEnterprises(w http.ResponseWriter, r *http.Request) {
	ip := r.RemoteAddr

	allowed, retryAfter := app.ratelimiter.Allow(ip)
	if !allowed {
		w.Header().Set("Retry-After", fmt.Sprintf("%.f", retryAfter.Seconds()))
		http.Error(w, "Too Many Requests", http.StatusTooManyRequests)
		return
	}

	var payload types.FormularioDados

	if err := readJSON(w, r, &payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	isProdEnv := app.config.env == "production"

	// Montando variáveis para o template de usuário
	vars := struct {
		Name    string
		Email   string
		Telefone string
		Empresa string
		Cidade  string
		Setor   string
		Atuacao string
		Porte   string
		Servicos []string
		Data    string
	}{
		Name:    payload.Name,
		Email:   payload.Email,
		Telefone: payload.Telefone,
		Empresa: payload.Empresa,
		Cidade:  payload.Cidade,
		Setor:   payload.Setor,
		Atuacao: payload.Atuacao,
		Porte:   payload.Porte,
		Servicos: payload.Servicos,
		Data:    time.Now().Format("02/01/2006 15:04"),
	}

	// Validação do payload
	if err := Validate.Struct(payload); err != nil {
		app.badRequestResponse(w, r, err)
		return
	}

	// 1) Enviar confirmação para o cliente
	status, err := app.mailer.Send(mailer.UserWelcomeTemplate, payload.Name, payload.Email, vars, !isProdEnv)
	if err != nil {
		app.logger.Errorw("error sending welcome email", "error", err)
		app.internalServerError(w, r, err)
		return
	}

	app.logger.Info("Email sent to client", "status code", status)

	// 2) Enviar confirmação para a equipa de vendas
	salesVars := struct {
		Cliente  string
		Email    string
		Telefone string
		Empresa  string
		Cidade   string
		Setor    string
		Atuacao  string
		Porte    string
		Servicos  []string
		Data     string
	}{
		Cliente:  payload.Name,
		Email:    payload.Email,
		Telefone: payload.Telefone,
		Empresa:  payload.Empresa,
		Cidade:   payload.Cidade,
		Setor:    payload.Setor,
		Atuacao:  payload.Atuacao,
		Porte:    payload.Porte,
		Servicos:  payload.Servicos,
		Data:     time.Now().Format("02/01/2006 15:04"),
	}

	salesEmail := "rkitoco@gmail.com" // trocar para email da equipa
	status, err = app.mailer.Send(
		mailer.SalesTeamNotificationTemplate,
		"Equipa de Vendas",
		salesEmail,
		salesVars,
		!isProdEnv,
	)
	if err != nil {
		app.logger.Errorw("error sending sales email", "error", err)
		app.internalServerError(w, r, err)
		return
	}

	app.logger.Info("Email sent to sales team", "status code", status)

	// 3) Resposta HTTP para o cliente
	if err := app.jsonResponse(w, http.StatusOK, payload); err != nil {
		app.internalServerError(w, r, err)
		return
	}
}