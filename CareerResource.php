<?php

namespace Modules\Careers\Filament\Resources;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Modules\Careers\Models\Career;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Modules\Careers\Filament\Resources\CareerResource\Pages;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\QueryBuilder;
use Filament\Tables\Filters\QueryBuilder\Constraints\TextConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\NumberConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\BooleanConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\DateConstraint;
use Filament\Tables\Filters\QueryBuilder\Constraints\SelectConstraint;
use App\Filament\Components\SeoTab;
use App\Filament\Helpers\TableHelper;
use App\Filament\Traits\HasResourceTranslations;

class CareerResource extends Resource
{
    use HasResourceTranslations;
    protected static ?string $model = Career::class;

    public static function getNavigationGroup(): ?string
    {
        return __('admin.navigation.inquiries_crm');
    }

    protected static ?string $navigationIcon = 'heroicon-o-briefcase';

    protected static ?int $navigationSort = 2;

    public static function getRecordTitleAttribute(): string
    {
        return getLocalizedFieldName('title');
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['title_en', 'title_ar'];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make(__('admin.careers.title'))
                    ->tabs([
                        Forms\Components\Tabs\Tab::make(__('admin.tabs.general'))
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\Section::make()
                                    ->schema([
                                        Forms\Components\TextInput::make('title_en')
                                            ->label(__('admin.careers.title_en'))
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => $set('slug', \Illuminate\Support\Str::slug($state))),
                                        Forms\Components\TextInput::make('title_ar')->label(__('admin.careers.title_ar'))->required(),
                                        Forms\Components\TextInput::make('slug')
                                            ->label(__('admin.table.slug'))
                                            ->required()
                                            ->unique(ignoreRecord: true)
                                            ->maxLength(191),
                                        Forms\Components\Select::make('type')
                                            ->label(__('admin.careers.type'))
                                            ->options([
                                                'full_time' => __('admin.careers.type_options.full_time'),
                                                'part_time' => __('admin.careers.type_options.part_time'),
                                            ])->required(),
                                        Forms\Components\TextInput::make('number_of_available_vacancies')->label(__('admin.careers.vacancies'))->numeric()->required(),
                                        Forms\Components\DatePicker::make('closed_at')->label(__('admin.careers.closed_at')),
                                        Forms\Components\Toggle::make('is_active')->label(__('admin.table.status'))->default(true),
                                    ])->columns(2),
                            ]),
                        Forms\Components\Tabs\Tab::make(__('admin.tabs.description'))
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\RichEditor::make('description_en')->label(__('admin.table.description_en')),
                                Forms\Components\RichEditor::make('description_ar')->label(__('admin.table.description_ar')),
                            ]),
                        Forms\Components\Tabs\Tab::make(__('admin.tabs.salary'))
                            ->icon('heroicon-o-currency-dollar')
                            ->schema([
                                Forms\Components\Toggle::make('show_salary')->label(__('admin.careers.show_salary')),
                                Forms\Components\KeyValue::make('salary_range')->label(__('admin.careers.salary_range')),
                            ]),
                        SeoTab::make(),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TableHelper::indexColumn(),
                Tables\Columns\TextColumn::make(getLocalizedFieldName('title'))
                    ->label(__('admin.table.title'))
                    ->searchable()
                    ->sortable()
                    ->alignment('center'),
                Tables\Columns\TextColumn::make('slug')
                    ->label(__('admin.table.slug'))
                    ->toggleable(isToggledHiddenByDefault: true)
                    ->alignment('center'),
                Tables\Columns\TextColumn::make('type')
                    ->label(__('admin.careers.type'))
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => __("admin.careers.type_options.{$state}"))
                    ->alignment('center'),
                Tables\Columns\TextColumn::make('number_of_available_vacancies')
                    ->label(__('admin.careers.vacancies'))
                    ->sortable()
                    ->alignment('center'),
                Tables\Columns\IconColumn::make('is_active')
                    ->label(__('admin.table.status'))
                    ->boolean()
                    ->sortable()
                    ->alignment('center'),
                TableHelper::createdAtColumn(),
            ])
            ->filters([
                QueryBuilder::make()
                    ->constraints([
                        TextConstraint::make('title_en')->label(__('admin.careers.title_en')),
                        TextConstraint::make('title_ar')->label(__('admin.careers.title_ar')),
                        TextConstraint::make('slug')->label(__('admin.careers.slug')),
                        SelectConstraint::make('type')
                            ->label(__('admin.careers.type'))
                            ->options([
                                'full_time' => __('admin.careers.type_options.full_time'),
                                'part_time' => __('admin.careers.type_options.part_time'),
                            ]),
                        NumberConstraint::make('number_of_available_vacancies')->label(__('admin.careers.vacancies')),
                        BooleanConstraint::make('is_active')->label(__('admin.table.status')),
                        DateConstraint::make('closed_at')->label(__('admin.careers.closed_at')),
                        DateConstraint::make('created_at')->label(__('admin.table.created_at')),
                    ]),
                Tables\Filters\SelectFilter::make('type')
                    ->label(__('admin.careers.type'))
                    ->options([
                        'full_time' => __('admin.careers.type_options.full_time'),
                        'part_time' => __('admin.careers.type_options.part_time'),
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')
                    ->label(__('admin.table.status')),
                Tables\Filters\TrashedFilter::make(),
            ])
            ->filtersLayout(FiltersLayout::Modal)
            ->filtersFormColumns(2)
            ->actions([
                TableHelper::standardActions(),
            ])
            ->actionsColumnLabel(__('admin.table.actions'))
            ->actionsAlignment('center')
            ->bulkActions(TableHelper::standardBulkActions([
                    Tables\Actions\BulkAction::make('activate')
                        ->label(__('admin.actions.activate'))
                        ->icon('heroicon-o-check-circle')
                        ->requiresConfirmation()
                        ->action(fn(\Illuminate\Support\Collection $records) => $records->toQuery()->update([
                            'is_active' => true,
                            'updated_at' => now(),
                            'updated_by' => auth()->id(),
                        ]))
                        ->successNotificationTitle(__('admin.notifications.updated'))
                        ->deselectRecordsAfterCompletion(),
                    Tables\Actions\BulkAction::make('deactivate')
                        ->label(__('admin.actions.deactivate'))
                        ->icon('heroicon-o-x-circle')
                        ->requiresConfirmation()
                        ->action(fn(\Illuminate\Support\Collection $records) => $records->toQuery()->update([
                            'is_active' => false,
                            'updated_at' => now(),
                            'updated_by' => auth()->id(),
                        ]))
                        ->successNotificationTitle(__('admin.notifications.updated'))
                        ->deselectRecordsAfterCompletion(),
            ]));
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCareers::route('/'),
            'create' => Pages\CreateCareer::route('/create'),
            'edit' => Pages\EditCareer::route('/{record}/edit'),
        ];
    }
}
