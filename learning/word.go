package main

type ExampleInfo struct {
	Example string `json:"example"`
	Source string `json:"source"`
}
type LexicalInfo struct {
	Word string `json:"word"`
	Type string `json:"type"`
}
type SenseInfo struct {
	Definition string `json:"definition"`
	DefinitionOriginal string `json:"definition_original"`
	CategoryInfo []string `json:"category_info"`
	LexicalInfo []LexicalInfo `json:"lexical_info"`
	ExampleInfo []ExampleInfo `json:"example_info"`
}
type PosInfo struct {
	Code int `json:"code"`
	SenseInfo []SenseInfo `json:"sense_info"`
}
type RelationInfo struct {
	Word string `json:"word"`
	Type string `json:"type"`
}
type OriginalLanguageInfo struct {
	OriginalLanguage string `json:"original_language"`
	LanguageType string `json:"language_type"`
}
type WordInfo struct {
	RelationInfo []RelationInfo `json:"relation_info"`
	WordUnit string `json:"word_unit"`
	Word string `json:"word"`
	WordType string `json:"word_type"`
	OriginalLanguageInfo []OriginalLanguageInfo `json:"original_language_info"`
	PosInfo []PosInfo `json:"pos_info"`
	Pos string `json:"pos"`
}
type Channel struct {
	
}